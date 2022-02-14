#!/usr/bin/env node

const program = require("commander");

import {
  HotMig,
  Migration,
  OnProgressArgs,
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

program.command("target", "initialize a new target or migration store");

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

    const task = await getReadyTarget(options.target, true, true);
    await task?.test();

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

    const result = await (
      await getReadyTarget(options.target, false, true)
    )?.up({
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

    console.log(chalk.green(`\n✨ done. migrated: ${result?.applied ?? "0"}`));
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

    console.log(chalk.green(`\n✨ done. migrated: ${result?.applied ?? "0"}`));
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

    console.log(result);

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

    // check if there are pending migrations
    const pending = (await target?.pending()) as Array<Migration>;
    if (pending?.length > 0) {
      console.log(
        chalk.red(
          `there are pending migrations for target "${options.target}", cant test.`
        )
      );
      process.exit(0);
    }

    // create dev.sql if not exists
    if (!target?.devMigationAlreadyExists()) {
      console.log(
        chalk.yellow(`creating dev.sql for target "${options.target}"...`)
      );
      await target?.new("insert name here", false);
    }

    // watch for changes in dev.sql
    const watcher = chokidar
      .watch(target?.devJsPath ?? ".", { ignoreInitial: false })
      .on("all", async (event, path) => {
        if (event === "change" || event === "add") {
          const prevDevJsPath = resolve(
            target?.targetDirectory ?? "",
            "prev.dev.js"
          );
          await target?.driver?.exec(async (params) => {
            // check if prev.dev.js exists
            if (existsSync(prevDevJsPath)) {
              try {
                const prevDevJs = require(prevDevJsPath);
                // validate prev.dev.js
                validateMigrationModule(prevDevJs);
                // run down in prev.dev.js

                const spinner = ora(
                  `running down on prev.dev.js for target "${options.target}"...`
                ).start();
                let failed = false;
                await prevDevJs
                  .down(params)
                  .then(() => spinner.succeed())
                  .catch((err: any) => {
                    spinner.fail();
                    console.log(err);
                    failed = true;
                  });

                if (failed) return;
              } catch (e) {
                console.log(chalk.red(`❌ prev.dev.js is invalid, cant test.`));
                console.log(e);
                return;
              }
            }

            // validate dev.js

            // remove from require cache
            delete require.cache[target?.devJsPath ?? ""];

            const devJs = require(path);
            validateMigrationModule(devJs);

            const result = new RegExp("// @name:(?<name>[^\n]*)\n").exec(
              readFileSync(path).toString()
            );
            const name = result?.groups?.name;
            if (name) {
              // run up, down, up in dev.js
              let spinner = ora(
                `running up for target "${options.target}"...`
              ).start();

              let failed = false;

              await devJs
                .up(params)
                .then(() => spinner.succeed())
                .catch((err: any) => {
                  spinner.fail();
                  console.log(err);
                  failed = true;
                });

              if (failed) return;

              spinner = ora(
                `running down for target "${options.target}"...`
              ).start();
              await devJs
                .down(params)
                .then(() => spinner.succeed())
                .catch((err: any) => {
                  spinner.fail();
                  console.log(err);
                  failed = true;
                });

              if (failed) return;

              spinner = ora(
                `running up for target "${options.target}"...`
              ).start();
              await devJs
                .up(params)
                .then(() => spinner.succeed())
                .catch((err: any) => {
                  spinner.fail();
                  console.log(err);
                  failed = true;
                });

              if (failed) return;

              console.log(
                chalk.yellow(
                  `\n✨ dev.sql was for target "${options.target}" is alright!\n`
                )
              );

              // copy dev.js to prev.dev.js
              copyFileSync(path, prevDevJsPath);

              // ask for commit
              const answer = await inqu.prompt({
                name: "action",
                type: "list",
                message: "Please select",
                choices: ["commit and migrate", "commit and exit", "exit"],
              });

              // ask for next dev.js ?
              if (answer.action === "commit and migrate") {
                watcher.unwatch(target?.devJsPath ?? "");
                await target
                  ?.commit()
                  .then(async () => {
                    await target?.latest();
                    unlinkSync(prevDevJsPath);

                    const answer = await inqu.prompt({
                      name: "action",
                      type: "list",
                      message: "Please select",
                      choices: ["create new dev migration", "exit"],
                    });

                    if (answer.action === "create new dev migration") {
                      await target?.new("insert name here", false);
                      watcher.add(target?.devJsPath ?? "");
                    } else {
                      process.exit(0);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    watcher.add(target?.devJsPath ?? "");
                  });
              } else if (answer.action === "commit and exit") {
                watcher.unwatch(target?.devJsPath ?? "");
                await target
                  ?.commit()
                  .then(() => {
                    unlinkSync(prevDevJsPath);
                    process.exit(0);
                  })
                  .catch((err) => {
                    console.log(err);
                    watcher.add(target?.devJsPath ?? "");
                  });
              } else if (answer.action === "exit") {
                process.exit(0);
              }
            } else {
              console.log(
                chalk.red(
                  `❌ dev.sql is invalid, cant test. please add a "//@name: [your name]" to the first line of the file.`
                )
              );
            }
          });
        } else if (event === "unlink") {
          console.log(
            chalk.yellow(
              `dev.sql was removed for target "${options.target}", stopping dev mode...`
            )
          );
          process.exit(0);
        }
      });

    // console.log(chalk.green(`✨ done!`));
    // process.exit(0);
  });

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
