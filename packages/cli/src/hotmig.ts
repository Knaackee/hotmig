#!/usr/bin/env node

const program = require("commander");

import { HotMig, OnProgressArgs } from "@hotmig/lib";
import axios from "axios";
import chalk from "chalk";
import inqu from "inquirer";
import ora from "ora";
import { header, title } from "./header";
const execa = require("execa");

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
        console.log(args);
      },
    });

    console.log(chalk.green(`✨ done. migrated: ${result?.applied ?? "0"}`));
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
        console.log(args);
      },
    });

    console.log(chalk.green(`✨ done. migrated: ${result?.applied ?? "0"}`));
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
        console.log(args);
      },
    });

    console.log(chalk.green(`✨ done. migrated: ${result?.applied ?? "0"}`));
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
        console.log(args);
      },
    });

    console.log(chalk.green(`✨ done. migrated: ${result?.applied ?? "0"}`));
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
