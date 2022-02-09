#!/usr/biddan/env node

import { HotMig, listGlobal } from "@hotmig/lib";
import chalk from "chalk";
import ora from "ora";
import { header } from "./header";
import q from "inquirer";

const program = require("commander");

program
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

program.parse(process.argv);
