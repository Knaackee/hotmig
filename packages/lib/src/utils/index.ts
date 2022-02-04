import fs from "fs";
import path from "path";

const execa = require("execa");

// based on: https://stackoverflow.com/a/38535119/479659
export const requireGlobal = async (packageName: string) => {
  const { stdout: globalNodeModules } = await execa("npm root -g");
  var packageDir = path.join(globalNodeModules, packageName);
  if (!fs.existsSync(packageDir))
    packageDir = path.join(globalNodeModules, "npm/node_modules", packageName); //find package required by old npm

  if (!fs.existsSync(packageDir))
    throw new Error("Cannot find global module '" + packageName + "'");

  var packageMeta = JSON.parse(
    fs.readFileSync(path.join(packageDir, "package.json")).toString()
  );
  if (!packageMeta.main) {
    throw new Error(`package ${packageName} does not export a main file`);
  }
  var main = path.join(packageDir, packageMeta.main);

  return require(main);
};

export const listGlobal = async () => {
  const { stdout } = await execa("npm list -g --depth=0");

  var globalNodeModules = Array.from((stdout as string).split("\n"))
    .splice(1)
    .map((s) => s.replace("├──", "").replace("└──", "").trim())
    .map((s) => ({
      name: s.startsWith("@") ? "@" + s.split("@")[1] : s.split("@")[0],
      version: s.startsWith("@") ? s.split("@")[1] : s.split("@")[2],
    }));

  return globalNodeModules;
};
