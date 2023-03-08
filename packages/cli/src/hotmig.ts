const program = require("commander");

import {
  HotMig,
  listGlobal,
  Migration,
  OnProgressArgs,
  Target,
  TargetConfig,
  validateMigrationModule,
} from "@hotmig/lib";
import axios from "axios";
import chalk from "chalk";
import chokidar from "chokidar";
import execa from "execa";
import { copyFileSync, exists, existsSync, readFileSync, unlinkSync } from "fs";
import inqu from "inquirer";
import ora from "ora";
import path, { resolve } from "path";
import q from "inquirer";
import { header, title } from "./header";
import { TestRunner, TestRunnerAction } from "./TestRunner";

console.log("");
const line = "-".repeat(process.stdout.columns);

let ignoreChanges = false;

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

    console.log(chalk.greenBright("hotmig initalized, happy migrating! ✨"));
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
    console.log(chalk.greenBright("✨ done, happy migrating!"));
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

    console.log(chalk.greenBright("✨ done, happy migrating!"));
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
      console.log(chalk.yellowBright(`\ninstalling ${name}...\n`));
      await execa(`npm install ${name.split(" ")[0]} -g`, {
        shell: true,
        stdio: "inherit",
      });
    }

    console.log(chalk.greenBright("✨ done, happy migrating!"));
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

    console.log(chalk.greenBright(`✨ done!`));
    process.exit(0);
  });

program
  .command("test")
  .description("test the current dev migration of a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`testing dev migration for target "${options.target}"...`);

    const target = await getReadyTarget(options.target, true, true);
    await testDevMigration(
      target?.devJsPath || "",
      target as Target,
      options,
      true
    );

    console.log(chalk.greenBright(`✨ done!`));
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

    console.log(chalk.greenBright(`✨ done!`));
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
          chalk.greenBright(
            `[UP] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    if (result?.applied != options.count)
      console.log(chalk.yellowBright(`no migrations applied`));
    else
      console.log(
        chalk.greenBright(`\n✨ done. migrated: ${result?.applied ?? "0"}`)
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
          chalk.greenBright(
            `[DOWN] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    if (result?.applied != options.count)
      console.log(chalk.yellowBright(`no migrations applied`));
    else
      console.log(
        chalk.greenBright(`\n✨ done. migrated: ${result?.applied ?? "0"}`)
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
          chalk.greenBright(
            `[UP] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    console.log(
      chalk.greenBright(`\n✨ done. migrated: ${result?.applied ?? "0"}`)
    );
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
          chalk.greenBright(
            `[DOWN] migrated ${args.migrations.length} of ${args.total}: ${
              args.migrations[args.migrations.length - 1].id
            }-${args.migrations[args.migrations.length - 1].name}`
          )
        );
      },
    });

    console.log(
      chalk.greenBright(`\n✨ done. migrated: ${result?.applied ?? "0"}`)
    );
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

    console.log(chalk.greenBright(`✨ done!`));
    process.exit(0);
  });

program
  .command("dev")
  .description("develope a dev migration of a target")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    header(`starting dev mode for target "${options.target}"...`);

    const target = await getReadyTarget(options.target, false, true);
    if (!target) {
      console.log(
        chalk.red(`target "${options.target}" not found. initialized ?`)
      );
      process.exit(0);
    }

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
        chalk.yellowBright(`creating dev.ts for target "${options.target}"...`)
      );
      await target?.new("insert name here", false);
    }

    // watch for changes in dev.ts
    chokidar
      .watch(target?.devJsPath ?? ".", { ignoreInitial: false })
      .on("all", async (event, path) => {
        if (ignoreChanges) return;

        if (event === "change" || event === "add") {
          const success = await testDevMigration(
            path,
            target as Target,
            options,
            true
          );
          if (success) {
            const answer = await inqu.prompt({
              name: "action",
              type: "list",
              message: "Please select",
              choices: ["next", "exit"],
            });

            if (answer.action === "next") {
              // a.k.a unwatch
              ignoreChanges = true;
              try {
                // commit
                console.log(chalk.yellowBright("committing..."));
                await target.commit();
                console.log(chalk.greenBright("✅ committed"));

                // migrate
                console.log(chalk.yellowBright("migrating..."));
                await target.latest();
                console.log(chalk.greenBright("✅ migrated"));

                // next
                console.log(chalk.yellowBright("creating next dev.ts..."));
                await target?.new("insert name here", false);
                console.log(chalk.greenBright("✅ created next dev.ts"));

                await new Promise((resolve) => setTimeout(resolve, 1000));
              } finally {
                ignoreChanges = false;
                console.log(chalk.yellowBright("✅ waiting for changes..."));
              }
            }

            if (answer.action === "exit") {
              // down on test migration
              await target?.driver?.exec(async (params: any) => {
                // load test migration
                const m = await getModule(target?.prevJsPath);
                await run("down", m, params, {});

                // remove prev. dev.ts
                console.log("removing dev.ts...");
                if (existsSync(target?.prevJsPath ?? "")) {
                  unlinkSync(target?.prevJsPath ?? "");
                }
              });

              process.exit(0);
            }
          }
        } else if (event === "unlink") {
          console.log(
            chalk.yellowBright(
              `dev.ts was removed for target "${options.target}", stopping dev mode...`
            )
          );
          process.exit(0);
        }
      });

    // console.log(chalk.greenBright(`✨ done!`));
    // process.exit(0);
  });

export const runAfter = async (config: TargetConfig) => {
  if (config?.dev?.runAfter) {
    console.log(chalk.yellowBright(`running dev.runAfter ...`));
    try {
      const runAfter = config.dev?.runAfter;
      await runAfter();
      console.log(chalk.greenBright(`✨ done!`));
    } catch (err) {
      console.log(chalk.red(`❌ runAfter failed`));
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
  console.log(line);
  console.log(chalk.yellowBright(`⬆️ [${action.toUpperCase()}]...`));

  var failed = false;
  var error: any;

  try {
    await migration[action](params);
    console.log(chalk.greenBright(`✅ [${action.toUpperCase()}]... done`));
  } catch (err: any) {
    console.log(chalk.red(`❌ [${action.toUpperCase()}]... failed`));
    console.log(chalk.red(err));
    failed = true;
    error = err;
    throw err;
  }

  console.log(line);
  console.log();
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

const test = async (
  migrationFilePath: string,
  action: TestRunnerAction,
  params: any
) => {
  const testDevTestRunner = new TestRunner(migrationFilePath);
  const result = await testDevTestRunner.run(action, params);
  if (!result.success) {
    console.log(
      chalk.red(
        `❌ ${path.basename(migrationFilePath)} "${action}" test failed.`
      )
    );
    throw new Error("Test failed");
  }
};

const testDevMigration = async (
  path: string,
  target: Target,
  options: any,
  interactive: boolean
) => {
  console.log("dev.ts changed, applying...");
  const prevDevJsPath = resolve(target?.targetDirectory ?? "", "prev.dev.ts");
  let failed = false;
  let runAfterFailed = false;
  ignoreChanges = true;
  try {
    await target?.driver?.exec(async (params: any) => {
      // check if prev.dev.ts exists
      if (existsSync(prevDevJsPath)) {
        try {
          const prevDevJs = await getModule(prevDevJsPath);

          // validate prev.dev.ts
          validateMigrationModule(prevDevJs);

          // run down in prev.dev.ts
          await test(prevDevJsPath, "testAfter", params);
          await run("down", prevDevJs, params, options);
          await test(prevDevJsPath, "testBefore", params);
        } catch (e) {
          console.log(chalk.red(`❌ prev.dev.ts is invalid`));
          console.log(e);
          failed = true;
        }
      }

      if (!failed) {
        const devJs = await getModule(path);
        validateMigrationModule(devJs);

        const result = new RegExp("// @name:(?<name>[^\n]*)\n").exec(
          readFileSync(path).toString()
        );
        const name = result?.groups?.name;
        if (name) {
          try {
            // run up, down, up in dev.ts
            await test(path, "testBefore", params);

            await run("up", devJs, params, options);
            await run("down", devJs, params, options);
            await run("up", devJs, params, options);

            await test(path, "testAfter", params);

            // copy dev.ts to prev.dev.ts
            copyFileSync(path, prevDevJsPath);
          } catch (e) {
            console.log(chalk.red(`❌ dev.ts is invalid`));
            console.log(e);
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
      }
    });

    if (!failed) {
      try {
        // run after is set
        await runAfter(target.config as any);
      } catch (e) {
        runAfterFailed = true;
        failed = true;
      }
    }
  } finally {
    ignoreChanges = false;
  }

  if (runAfterFailed) {
    console.log(
      chalk.red.italic(`Please fix runAfter, restart and try again.`)
    );
  }

  return !failed;
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
