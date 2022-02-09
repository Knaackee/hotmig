#!/usr/bin/env node

import { HotMig } from "@hotmig/lib";
import chalk from "chalk";
import { header } from "./header";

const cli = require("commander");

cli
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

cli.parse(process.argv);
