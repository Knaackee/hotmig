#!/usr/bin/env node

const program = require("commander");
import { listGlobal } from "@hotmig/lib";
import chalk from "chalk";
import inqu from "inquirer";
import ora from "ora";
import axios from "axios";
import { ensureInitialized, start } from "./utils";
const execa = require("execa");

const title = chalk.green("🔥 HotMig - Database migration tool");

console.log("");
program
  .name("hotmig")
  .description(title)
  .version(require("../package.json").version);

program
  .command("init")
  .description("initalize hotmig in the current directory")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Initializing...");
    if (hm.isInitialized()) {
      console.log(chalk.red("Already initialized"));
      process.exit(1);
    }

    // show spinner and get global modules
    let spinner = ora({
      text: "Getting drivers from global modules...",
    }).start();
    let global = await listGlobal();
    let available = global.filter((x) => x.name.indexOf("-hotmig-driver") > -1);
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
    available = global.filter((x) => x.name.indexOf("-hotmig-driver") > -1);
    spinner.stop();

    // ask for driver
    const answer = await inqu.prompt({
      name: "driver",
      type: "list",
      message: "Choose driver",
      choices: available.map((g) => g.name),
    });

    // init (interactive)
    await hm.init(answer.driver, true);

    // getEmptyMigration() => { up(), down(), name() }

    // show success message
    console.log(chalk.green("✨ done, happy migrating!"));
  });

program
  .command("install-driver")
  .description("...")
  .action(async (options: any) => {
    // show cli title
    console.log(`${title}\n`);

    // show action title
    console.log(`${chalk.yellow("Installing drivers...")}\n`);

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
      await execa(`npm install ${name.split(" ")[0]} -g`, {
        shell: true,
        stdio: "inherit",
      });
    }

    console.log(chalk.green("✨ done, happy migrating!"));
    process.exit(0);
  });

// zu init
program
  .command("init-store")
  .description("...")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, "init-store", "Initializing...");
    await hm.loadConfig();
    ensureInitialized(hm);
    const alreadyExists = await hm.migrationStoreExists();
    if (alreadyExists) {
      console.log(chalk.yellow("migrations table already exists"));
      process.exit(1);
    }
    await hm.createMigrationStore();
    console.log(chalk.green("✨ done, happy migrating!"));
    process.exit(0);
  });

// TODO: init-store

program
  .command("up")
  .description("migrate")
  .option("-t, --target <string>", "name of the target", "default")
  .option("-c, --count <number>", "cound", 1)
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Up...");
    await hm.loadConfig();
    ensureInitialized(hm);

    if (!(await hm.migrationStoreExists())) {
      console.log(
        chalk.yellow(
          "migrations table does not exists. please run init-db first"
        )
      );
      process.exit(1);
    }

    const result = await hm.up({ count: options.count });
    console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
    process.exit(0);
  });

program
  .command("down")
  .description("migrate")
  .option("-t, --target <string>", "name of the target", "default")
  .option("-c, --count <number>", "cound", 1)
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Up...");
    await hm.loadConfig();
    ensureInitialized(hm);

    if (!(await hm.migrationStoreExists())) {
      console.log(
        chalk.yellow(
          "migrations table does not exists. please run init-db first"
        )
      );
      process.exit(1);
    }

    const result = await hm.down({ count: options.count });
    console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
    process.exit(0);
  });

program
  .command("latest")
  .description("migrate")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Latest...");
    await hm.loadConfig();
    ensureInitialized(hm);

    if (!(await hm.migrationStoreExists())) {
      console.log(
        chalk.yellow(
          "migrations table does not exists. please run init-db first"
        )
      );
      process.exit(1);
    }

    const result = await hm.latest();
    console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
    process.exit(0);
  });

program
  .command("reset")
  .description("migrate")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Reset...");

    await hm.loadConfig();
    ensureInitialized(hm);

    if (!(await hm.migrationStoreExists())) {
      console.log(
        chalk.yellow(
          "migrations table does not exists. please run init-db first"
        )
      );
      process.exit(1);
    }

    const result = await hm.reset();
    console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
    process.exit(0);
  });

program
  .command("new")
  .description("create a new dev migration")
  .argument("<name>", "name of the migration")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (name: string, options: any) => {
    const hm = await start(options.target, title, "New...");
    await hm.loadConfig();
    ensureInitialized(hm);
    await hm.new(name);
    console.log(chalk.green("✨ done, happy migrating!"));
  });

program
  .command("commit")
  .description("commit the current dev migration")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Commit...");
    await hm.loadConfig();
    ensureInitialized(hm);
    await hm.commit();
  });

program
  .command("pending")
  .description("migrate")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Up...");
    await hm.loadConfig();
    ensureInitialized(hm);

    if (!(await hm.migrationStoreExists())) {
      console.log(
        chalk.yellow(
          "migrations table does not exists. please run init-db first"
        )
      );
      process.exit(1);
    }

    const result = await hm.pending();
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  });

program
  .command("test")
  .description("test the current dev migration")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Test...");
    await hm.loadConfig();
    ensureInitialized(hm);

    if (!(await hm.migrationStoreExists())) {
      console.log(
        chalk.yellow(
          "migrations table does not exists. please run init-store first"
        )
      );
      process.exit(1);
    }

    await hm.test();
    console.log("done");
    process.exit(0);
  });

program.parse();
