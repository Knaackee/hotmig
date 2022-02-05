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
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    console.log(options);
    const hm = await start(options.target, title, "Initializing...");
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

    // init (interactive)
    await hm.init(answer.driver, true);

    // getEmptyMigration() => { up(), down(), name() }

    // show success message
    console.log(chalk.green("✨ done, happy migrating!"));
  });

// zu init
// program
//   .command("init-db")
//   .description("...")
//   .option(
//     "-c, --connection-string <string>",
//     "database connection string to use instead of process.env.CONNECTION_STRING"
//   )
//   .action(async (options: any) => {
//     const hm = await start(title, "Intialize DB...");
//     ensureInitialized(hm);

//     await withDriver(hm, options, async (db) => {
//       const alreadyExists = await db.migrationsTableExists();
//       if (alreadyExists) {
//         console.log(chalk.yellow("migrations table already exists"));
//         process.exit(1);
//       }
//       await db.createMigrationsTable();
//       console.log(chalk.green("✨ done, happy migrating!"));
//       process.exit(0);
//     });
//   });

program
  .command("up")
  .description("migrate one up")
  .option("-t, --target <string>", "name of the target", "default")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Up...");
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
  .option("-t, --target <string>", "name of the target", "default")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Up...");
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
  .option("-t, --target <string>", "name of the target", "default")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Up...");
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
  .description("create a new dev migration")
  .argument("<name>", "name of the migration")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (name: string, options: any) => {
    const hm = await start(options.target, title, "New...");
    ensureInitialized(hm);
    await hm.new(name);
  });

program
  .command("commit")
  .description("commit the current dev migration")
  .option("-t, --target <string>", "name of the target", "default")
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Commit...");
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
    const hm = await start(options.target, title, "Pending...");
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
  .description("test the current dev migration")
  .option(
    "-c, --connection-string <string>",
    "database connection string to use instead of process.env.CONNECTION_STRING"
  )
  .action(async (options: any) => {
    const hm = await start(options.target, title, "Test...");
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
