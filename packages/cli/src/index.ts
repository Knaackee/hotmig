#!/usr/bin/env node

const program = require("commander");
import { listGlobal } from "@hotmig/lib";
import chalk from "chalk";
import inqu from "inquirer";
import ora from "ora";
import { ensureInitialized, start, withDriver } from "./utils";

const title = chalk.green("🔥 HotMig - Database migration tool");

console.log("");
program
  .name("hotmig")
  .description(title)
  .version(require("../package.json").version);

program
  .command("init")
  .description("initalize hotmig in the current directory")
  .action(async () => {
    const hm = await start(title, "Initializing...");
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
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(title, "Intialize DB...");
    ensureInitialized(hm);

    await withDriver(hm, options, async (db) => {
      const alreadyExists = await db.migrationsTableExists();
      if (alreadyExists) {
        console.log(chalk.yellow("migrations table already exists"));
        process.exit(1);
      }
      await db.createMigrationsTable();
      console.log(chalk.green("✨ done, happy migrating!"));
      process.exit(0);
    });
  });

program
  .command("up")
  .description("migrate one up")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(title, "Up...");
    ensureInitialized(hm);
    withDriver(hm, options, async (db) => {
      if (!(await db.migrationsTableExists())) {
        console.log(
          chalk.yellow(
            "migrations table does not exists. please run init-db first"
          )
        );
        process.exit(1);
      }
      const result = await hm.up();
      console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
      process.exit(0);
    }).then(() => {});
  });

program
  .command("down")
  .description("migrate one down")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(title, "Up...");
    ensureInitialized(hm);

    await withDriver(hm, options, async (db) => {
      if (!(await db.migrationsTableExists())) {
        console.log(
          chalk.yellow(
            "migrations table does not exists. please run init-db first"
          )
        );
        process.exit(1);
      }
      const result = await hm.down();
      console.log(chalk.green(`✨ done. migrated: ${result.applied}`));
      process.exit(0);
    });
  });

program
  .command("latest")
  .description("migrate to lastest")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(title, "Up...");
    ensureInitialized(hm);

    await withDriver(hm, options, async (db) => {
      if (!(await db.migrationsTableExists())) {
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
  });

program
  .command("new")
  .description("create a new dev.sql")
  .argument("<name>", "name of the migration")
  .action(async (name: string, options: any) => {
    const hm = await start(title, "New...");
    ensureInitialized(hm);
    await hm.new(name);
  });

program
  .command("commit")
  .description("")
  .action(async (options: any) => {
    const hm = await start(title, "New...");
    ensureInitialized(hm);
    await hm.commit();
  });

program
  .command("pending")
  .description("get pending")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(title, "Pending...");
    ensureInitialized(hm);

    await withDriver(hm, options, async (db) => {
      if (!(await db.migrationsTableExists())) {
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
  });

program
  .command("test")
  .description("")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(title, "Pending...");
    ensureInitialized(hm);

    await withDriver(hm, options, async (db) => {
      if (!(await db.migrationsTableExists())) {
        console.log(
          chalk.yellow(
            "migrations table does not exists. please run init-db first"
          )
        );
        process.exit(1);
      }
      const result = await hm.test();
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    });
  });

program.parse();
