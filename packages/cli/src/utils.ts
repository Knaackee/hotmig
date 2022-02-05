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

export const withDriver = async (
  hm: HotMig,
  options: any,
  cb: (db: Driver) => Promise<void>
) => {
  await hm.loadConfig();
  // check if connection string is set
  const connectionString =
    options.connectionString || process.env.CONNECTION_STRING;
  if (!connectionString) {
    console.log(
      chalk.red("connection string is missing.\n") +
        chalk.white(
          "please provide using --connection-string or set it in process.env.CONNECTION_STRING (directly or via a .env file)"
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
    const db = new plugin["Database"](connectionString) as Driver;
    await db.init();
    hm.setDriver(db);

    await cb(db);
  } catch (err) {
    console.log(chalk.bgRed.white(`error loading driver ${hm.config?.driver}`));
    console.log(err);
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
