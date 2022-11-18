const program = require("commander");

import {
  HotMig,
  listGlobal,
  Migration,
  OnProgressArgs,
  TargetConfig,
  validateMigrationModule,
} from "@hotmig/lib";
import axios from "axios";
import chalk from "chalk";
import chokidar from "chokidar";
import execa from "execa";
import { copyFileSync, existsSync, readFileSync, unlinkSync } from "fs";
import inqu from "inquirer";
import ora from "ora";
import { resolve } from "path";
import q from "inquirer";
import { header, title } from "./header";

console.log("");

program
  .name("hotmig")
  .description(title)
  .version(require("../package.json").version);

program
  .command("init")
  .description("initalize hotmig in the current directory")
  .action(async (options: any) => {
    header("initializing hotmig...");

    const hm = new HotMig(process.cwd());

    if (hm.isInitialized()) {
      console.log(chalk.red("already initialized"));
      return;
    }
    const answer = await inqu.prompt({
      name: "migrationsDir",
      type: "input",
      message: "Where you want to store your local migrations?",
      default: "./migrations",
    });

    await hm.init(answer.migrationsDir);

    console.log(chalk.green("hotmig initalized, happy migrating! ✨"));
  });

program
  .command("init-target")
  .description("initalize a new target")
  .argument("[name]", "name of the target", "default")
  .action(async (name: string) => {
    header(`initializing new target "${name}"...`);

    const hm = new HotMig(process.cwd());
    if (!hm.isInitialized()) {
      console.log(chalk.red("hotmig is not initialized"));
      return;
    }
    await hm.loadConfig();

    const target = await hm.target(name);

    if (await target.isInitialized()) {
      console.log(chalk.red(`target "${name}" is already initialized`));
      process.exit(1);
    }

    // show spinner and get global modules
    let spinner = ora({
      text: "Getting drivers from global modules...",
    }).start();
    let global = await listGlobal();
    let available = global.filter((x) => x.name.indexOf("hotmig-driver-") > -1);
    spinner.stop();

    // exit if no driver was found
    if (available.length === 0) {
      console.log(
        chalk.red(
          "no driver found in global modules. Please run install-drivers."
        )
      );

      process.exit(1);
    }

    // show spinner and get global modules
    spinner = ora({
      text: "Getting drivers from global modules...",
    }).start();
    global = await listGlobal();
    available = global.filter((x) => x.name.indexOf("hotmig-driver") > -1);
    spinner.stop();

    // ask for driver
    const answer = await q.prompt({
      name: "driver",
      type: "list",
      message: "Choose driver",
      choices: available.map((g) => g.name),
    });

    // init (interactive)
    await target.init(answer.driver, true);

    // show success message
    console.log(chalk.green("✨ done, happy migrating!"));
    process.exit(0);
  });

program
  .command("init-store")
  .description("initalize a new store")
  .argument("[name]", "name of the target", "default")
  .action(async (name: string) => {
    header(`initializing migration store for target "${name}"...`);

    const hm = new HotMig(process.cwd());

    if (!hm.isInitialized()) {
      console.log(chalk.red("hotmig is not initialized"));
      process.exit(1);
    }

    await hm.loadConfig();

    const target = await hm.target(name);
    if (!target.isInitialized()) {
      console.log(chalk.red(`target "${name}" is not initialized`));
      process.exit(1);
    }

    if (await target.migrationStoreExists()) {
      console.log(chalk.red("migration store already exists"));
      process.exit(1);
    }

    await target.createMigrationStore();

    console.log(chalk.green("✨ done, happy migrating!"));
    process.exit(0);
  });

program
  .command("install-driver")
  .description("install a driver (e.g. postgres)")
  .action(async (options: any) => {
    header("installing driver...");

    let spinner = ora({
      text: "fetching available drivers...",
    }).start();

    const url =
      "https://gist.githubusercontent.com/Knaackee/b4feaaad25ca38a82e6442a5947289a6/raw";
    const response = await axios.get(url);
    const drivers = await response.data;

    spinner.stop();

    const answer = await inqu.prompt({
      name: "drivers",
      type: "checkbox",
      message: "Select drivers to install",
      choices: drivers.map((g: any) => `${g.package} (${g.name})`),
    });

    for (const name of answer.drivers) {
      console.log(chalk.yellow(`\ninstalling ${name}...\n`));
      await execa(`npm install ${name.split(" ")[0]} -g`, {
        shell: true,
        stdio: "inherit",
      });
    }

    console.log(chalk.green("✨ done, happy migrating!"));
    process.exit(0);
  });

program
  .command("new")
  .description("create a new dev migration for a target")
  .argument("<name>", "name of the migration")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (name: string, options: any) => {
    header(
      `creating a new dev migration "${name}" for target "${options.target}"...`
    );

    const target = await getReadyTarget(options.target, false, false);
    if (target?.devMigationAlreadyExists()) {
      console.log(
        chalk.red(`dev migration for target "${options.target}" already exists`)
      );
      process.exit(0);
    }

    console.log(chalk.green(`✨ done!`));
    process.exit(0);
  });

program
  .command("test")
  .description("test the current dev migration of a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`testing dev migration for target "${options.target}"...`);

    const target = await getReadyTarget(options.target, true, true);
    await testDevMigration(target?.devJsPath || "", target, options, true);

    console.log(chalk.green(`✨ done!`));
    process.exit(0);
  });

program
  .command("commit")
  .description("commit the current dev migration of a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`committing dev migration for target "${options.target}"...`);

    const task = await getReadyTarget(options.target, true, true);
    await task?.commit();

    console.log(chalk.green(`✨ done!`));
    process.exit(0);
  });

program
  .command("up")
  .description("migrate a target up")
  .option("-t, --target <string>", "name of the target", "default")
  .option("-c, --count <number>", "cound", 1)
  .action(async (options: any) => {
    header(
      `running up for target "${options.target}" (${options.count} times)...`
    );

    const target = await getReadyTarget(options.target, false, true);
    const result = await target?.up({
      count: options.count,
      onProgress: async (args: OnProgressArgs) => {
        console.log(
          chalk.green(
            `[UP] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    if (result?.applied != options.count)
      console.log(chalk.yellow(`no migrations applied`));
    else
      console.log(
        chalk.green(`\n✨ done. migrated: ${result?.applied ?? "0"}`)
      );
    process.exit(0);
  });

program
  .command("down")
  .description("migrate a target down")
  .option("-t, --target <string>", "name of the target", "default")
  .option("-c, --count <number>", "cound", 1)
  .action(async (options: any) => {
    header(
      `running down for target "${options.target}" (${options.count} times)...`
    );

    const result = await (
      await getReadyTarget(options.target, false, true)
    )?.down({
      count: options.count,
      onProgress: async (args: OnProgressArgs) => {
        console.log(
          chalk.green(
            `[DOWN] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    if (result?.applied != options.count)
      console.log(chalk.yellow(`no migrations applied`));
    else
      console.log(
        chalk.green(`\n✨ done. migrated: ${result?.applied ?? "0"}`)
      );
    process.exit(0);
  });

program
  .command("latest")
  .description("apply all pending migrations for a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`applying all pending migrations for target "${options.target}"...`);

    const result = await (
      await getReadyTarget(options.target, false, true)
    )?.latest({
      onProgress: async (args: OnProgressArgs) => {
        console.log(
          chalk.green(
            `[UP] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    console.log(chalk.green(`\n✨ done. migrated: ${result?.applied ?? "0"}`));
    process.exit(0);
  });

program
  .command("reset")
  .description("resetting all applied migrations for a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(
      `resetting all applied migrations for target "${options.target}"...`
    );

    const result = await (
      await getReadyTarget(options.target, false, true)
    )?.reset({
      onProgress: async (args: OnProgressArgs) => {
        console.log(
          chalk.green(
            `[DOWN] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    console.log(chalk.green(`\n✨ done. migrated: ${result?.applied ?? "0"}`));
    process.exit(0);
  });

program
  .command("pending")
  .description("lists all pending transactions of a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`pending transactions for target "${options.target}":`);

    const task = await getReadyTarget(options.target, false, false);
    const result = await task?.pending();

    console.table(result, ["id", "name"]);

    console.log(chalk.green(`✨ done!`));
    process.exit(0);
  });

program
  .command("dev")
  .description("develope a dev migration of a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`starting dev mode for target "${options.target}"...`);

    const target = await getReadyTarget(options.target, false, true);

    // check for pending migrations
    const pending = (await target?.pending()) as Array<Migration>;

    if (pending?.length > 0) {
      console.log(
        chalk.red(
          `there are pending migrations for target "${options.target}", cant test.`
        )
      );
      process.exit(0);
    }

    // create dev.ts if not exists
    if (!target?.devMigationAlreadyExists()) {
      console.log(
        chalk.yellow(`creating dev.tsfor target "${options.target}"...`)
      );
      await target?.new("insert name here", false);
    }

    // watch for changes in dev.ts
    chokidar
      .watch(target?.devJsPath ?? ".", { ignoreInitial: false })
      .on("all", async (event, path) => {
        if (event === "change" || event === "add") {
          await testDevMigration(path, target, options, true);
        } else if (event === "unlink") {
          console.log(
            chalk.yellow(
              `dev.ts was removed for target "${options.target}", stopping dev mode...`
            )
          );
          process.exit(0);
        }
      });

    // console.log(chalk.green(`✨ done!`));
    // process.exit(0);
  });

export const runAfter = async (config: TargetConfig) => {
  if (config?.dev?.runAfter) {
    var spinner = ora(`running dev.runAfter ...`).start();
    try {
      const runAfter = config.dev?.runAfter;
      await runAfter();

      spinner.succeed();
    } catch (err) {
      spinner.fail();
      console.log(chalk.red(err));
      throw err;
    }
  }
};

const run = async (
  action: "up" | "down",
  migration: { up: (params: any) => any; down: (params: any) => any },
  params: any,
  options: any
) => {
  var failed = false;
  var error: any;
  var spinner = ora(
    `running ${action === "up" ? "up" : "down"} for target "${
      options.target
    }"...`
  ).start();
  var c = console.log;
  try {
    console.log = function () {};
    await migration[action](params);
    spinner.succeed();
  } catch (err: any) {
    spinner.fail();
    failed = true;
    error = err;
  } finally {
    console.log = c;
  }

  if (failed) {
    console.log(chalk.white.bgRed.bold(">>" + error.message));
    throw error;
  }
};

const getModule = async (p: string) => {
  if (!existsSync(p)) {
    throw new Error("File does not exist");
  }

  const module = await import(p);
  // delete require cache
  delete require.cache[p];

  return module;
};

const testDevMigration = async (
  path: string,
  target: any,
  options: any,
  interactive: boolean
) => {
  console.log("dev.ts changed, applying...");
  const prevDevJsPath = resolve(target?.targetDirectory ?? "", "prev.dev.ts");
  let failed = false;
  let runAfterFailed = false;
  let error = new Error();
  await target?.driver?.exec(async (params: any) => {
    // check if prev.dev.ts exists
    if (existsSync(prevDevJsPath)) {
      try {
        const prevDevJs = await getModule(prevDevJsPath);

        // validate prev.dev.ts
        validateMigrationModule(prevDevJs);

        // run down in prev.dev.ts
        await run("down", prevDevJs, params, options.target);
      } catch (e) {
        console.log(chalk.red(`❌ prev.dev.ts is invalid, cant test.`));
        console.log(e);
        throw e;
      }
    }

    const devJs = await getModule(path);
    validateMigrationModule(devJs);

    const result = new RegExp("// @name:(?<name>[^\n]*)\n").exec(
      readFileSync(path).toString()
    );
    const name = result?.groups?.name;
    if (name) {
      try {
        // run up, down, up in dev.ts
        await run("up", devJs, params, options);
        await run("down", devJs, params, options);
        await run("up", devJs, params, options);

        // copy dev.ts to prev.dev.ts
        copyFileSync(path, prevDevJsPath);
      } catch (e: any) {
        if (!runAfterFailed) {
          console.log(chalk.red.italic(`Please fix dev.ts and try again.`));
        } else {
          console.log(
            chalk.red.italic(`Please fix runAfter, restart and try again.`)
          );
        }
        failed = true;
      }
    } else {
      console.log(
        chalk.red.italic(
          `dev.ts is invalid, cant test. please add a "//@name: [your name]" to the first line of the file.`
        )
      );
      failed = true;
    }
  });

  if (!failed) {
    try {
      // run after is set
      await runAfter(target?.config);
    } catch (e) {
      runAfterFailed = true;
      throw e;
    }

    if (!runAfterFailed) {
      const answer = await inqu.prompt({
        name: "action",
        type: "list",
        message: "Please select",
        choices: ["exit"],
      });

      if (answer.action === "exit") {
        process.exit(0);
      }
    } else {
      console.log(
        chalk.red.italic(`Please fix runAfter, restart and try again.`)
      );
    }
  }
};

const getReadyTarget = async (
  targetName: string,
  devMigrationRequired?: boolean,
  storeRequired?: boolean
) => {
  const hm = new HotMig(process.cwd());

  if (!hm.isInitialized()) {
    console.log(chalk.red("hotmig is not initalized, run init first"));
    return;
  }

  await hm.loadConfig();

  const target = await hm.target(targetName);

  if (!target.isInitialized()) {
    console.log(chalk.red(`target "${targetName}" is not initialized`));
    process.exit(1);
  }

  if (devMigrationRequired && !target.devMigationAlreadyExists()) {
    console.log(
      chalk.red(
        `dev migration does not exist for target "${targetName}". run "new" first`
      )
    );
    process.exit(1);
  }

  if (storeRequired && !target.migrationStoreExists()) {
    console.log(
      chalk.red(
        `target "${targetName}" does not have a migration store. run "target init-store" first`
      )
    );
    process.exit(1);
  }

  return target;
};

program.parse();
