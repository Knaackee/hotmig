#!/usr/bin/env node

import chalk from "chalk";
const program = require("commander");
import { HotMig } from "hotmig";

const title = chalk.green("🔥HotMig - Database migration tool");

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
  .action(() => {
    console.log(`${title}\n`);
    console.log(`${chalk.yellow("Initializing...")}`);

    const hm = new HotMig();
  });
program.parse();
