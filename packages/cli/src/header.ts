import chalk from "chalk";

export const header = (message: string) => {
  console.log(title + "\n");
  console.log(chalk.yellowBright(`${message}\n`));
};

export const title = chalk.green.bold("🔥 HotMig - Database migration tool");
