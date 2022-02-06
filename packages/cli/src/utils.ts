import "dotenv/config";

import { Driver, HotMig, requireGlobal } from "@hotmig/lib";
import chalk from "chalk";
import invariant from "invariant";

export const ensureInitialized = async (hm: HotMig) => {
  if (!hm.isInitialized()) {
    console.log(chalk.red("not initialized"));
    process.exit(1);
  }
};

export const start = async (target: string, title: string, text: string) => {
  // show cli title
  console.log(`${title}\n`);

  // check if already initialized
  const hm = new HotMig(target);

  // show action title
  console.log(`${chalk.yellow(text)}`);

  return hm;
};
