#!/usr/bin/env node

const program = require("commander");
import chalk from "chalk";
import { Database, HotMig } from "@hotmig/lib";
import ora from "ora";
import inqu from "inquirer";
import { listGlobal, requireGlobal } from "@hotmig/lib";
import invariant from "invariant";

const title = chalk.green("🔥 HotMig - Database migration tool");

const start = async (text: string) => {
  // show cli title
  console.log(`${title}\n`);

  // check if already initialized
  const hm = new HotMig();

  // show action title
  console.log(`${chalk.yellow(text)}`);

  return hm;
};

console.log("");
program
  .name("hotmig")
  .description(title)
  .version(require("../package.json").version);

program
  .command("init")
  .description("initalize hotmig in the current directory")
  //     .argument("<string>", "string to split")
  //     .option("--first", "display just the first substring")
  //     .option("-s, --separator <char>", "separator character", ",")
  //     .action((str: string, options: { first: any; separator: any }) => {
  .action(async () => {
    const hm = await start("Initializing...");
    if (hm.isInitialized()) {
      console.log(chalk.red("Already initialized"));
      process.exit(1);
    }

    // show spinner and get global modules
    const spinner = ora({ text: "Getting global modules..." }).start();
    const global = await listGlobal();
    const available = global.filter(
      (x) => x.name.indexOf("hotmig-driver") > -1
    );
    spinner.stop();

    // exit if no driver was found
    if (available.length === 0) {
      console.log(chalk.red("no driver found"));
      process.exit(1);
    }

    // ask for driver
    const answer = await inqu.prompt({
      name: "driver",
      type: "list",
      message: "Choose driver",
      choices: available.map((g) => g.name),
    });

    // init
    await hm.init({ driver: answer.driver });

    // show success message
    console.log(chalk.green("✨ done, happy migrating!"));
  });

program
  .command("init-db")
  .description("...")
  // .argument(
  //   "<connectionString>",
  //   "connection string to use instead of process.env.CONNECTION_STRING"
  // )
  // .option("--first", "display just the first substring")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  //     .action((str: string, options: { first: any; separator: any }) => {
  .action(async (options: any) => {
    const hm = await start("Intialize DB...");
    if (!hm.isInitialized()) {
      console.log(chalk.red("not initialized"));
      process.exit(1);
    }

    await hm.loadConfig();

    // check if connection string is set
    const connectionString =
      options.connectionString || process.env.CONNECTION_STRING;
    if (!connectionString) {
      console.log(
        chalk.red("connection string is missing.\n") +
          chalk.white(
            "please provide using --connection-string or set it in process.env.CONNECTION_STRING"
          )
      );
      process.exit(1);
    }

    try {
      const plugin = await requireGlobal(hm.config?.driver ?? "");
      invariant(
        plugin["Database"],
        `driver ${hm.config?.driver} does not export a class "Database"`
      );
      const db = new plugin["Database"](connectionString) as Database;
      await db.init();
      const alreadyExists = await db.migrationsTableExists();
      if (alreadyExists) {
        console.log(chalk.yellow("migrations table already exists"));
        process.exit(1);
      }
      await db.createMigrationsTable();
      console.log(chalk.green("✨ done, happy migrating!"));
      process.exit(0);
    } catch (err) {
      console.log(
        chalk.bgRed.white(`error loading driver ${hm.config?.driver}`)
      );
      console.log(err);
    }
  });

program
  .command("up")
  .description("migrate one up")
  // .argument(
  //   "<connectionString>",
  //   "connection string to use instead of process.env.CONNECTION_STRING"
  // )
  // .option("--first", "display just the first substring")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  //     .action((str: string, options: { first: any; separator: any }) => {
  .action(async (options: any) => {
    const hm = await start("Up...");
    if (!hm.isInitialized()) {
      console.log(chalk.red("not initialized"));
      process.exit(1);
    }

    await hm.loadConfig();

    // check if connection string is set
    const connectionString =
      options.connectionString || process.env.CONNECTION_STRING;
    if (!connectionString) {
      console.log(
        chalk.red("connection string is missing.\n") +
          chalk.white(
            "please provide using --connection-string or set it in process.env.CONNECTION_STRING"
          )
      );
      process.exit(1);
    }

    try {
      const plugin = await requireGlobal(hm.config?.driver ?? "");
      invariant(
        plugin["Database"],
        `driver ${hm.config?.driver} does not export a class "Database"`
      );
      const db = new plugin["Database"](connectionString);
      await db.init();

      if (!(await db.migrationsTableExists())) {
        console.log(
          chalk.yellow(
            "migrations table does not exists. please run init-db first"
          )
        );
        process.exit(1);
      }

      hm.setDatabase(db);
      const result = await hm.up();
      console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
      process.exit(0);
    } catch (err) {
      console.log(
        chalk.bgRed.white(`error loading driver ${hm.config?.driver}`)
      );
      console.log(err);
    }
  });

program.parse();
