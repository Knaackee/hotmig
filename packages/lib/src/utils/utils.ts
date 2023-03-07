import { readFileSync } from "fs";
import { Migration } from "../models";

export const isValidMigrationContent = (filePath: string) => {
  try {
    delete require.cache[require.resolve(filePath)];
    // const module = import(filePath);
  } catch (err) {
    return false;
  }
  return true;
};

const pad2 = (n: number) => {
  return n < 10 ? "0" + n : n;
};

export const generateId = () => {
  const now = new Date();
  const id =
    now.getFullYear().toString() +
    pad2(now.getMonth() + 1) +
    pad2(now.getDate()) +
    pad2(now.getHours()) +
    pad2(now.getMinutes()) +
    pad2(now.getSeconds()) +
    pad2(now.getMilliseconds());
  // ensure length
  return id.padEnd(17, "0");
};

// export const parseMigrationContent = (content: string) => {
//   const lines = content.split(/\r?\n/);
//   const migrationName = lines[1].split(":")[1].trim();
//   const upSql = new Array<string>();
//   const downSql = new Array<string>();

//   var section: "none" | "up" | "down" = "none";
//   for (const line of lines) {
//     if (line.startsWith("-- UP")) {
//       section = "up";
//     } else if (line.startsWith("-- DOWN")) {
//       section = "down";
//     }

//     if (section === "up" && !line.startsWith("-- UP")) {
//       upSql.push(line);
//     } else if (section === "down" && !line.startsWith("-- DOWN")) {
//       downSql.push(line);
//     }
//   }

//   const migration = {
//     name: migrationName,
//     upSql: upSql.join("\n"),
//     downSql: downSql.join("\n"),
//   } as MigrationFileContent;

//   return migration;
// };

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
