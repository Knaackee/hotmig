import { readdirSync, statSync } from "fs";
import { join, normalize, resolve } from "path";

const isDirectory = (path: string) => statSync(path).isDirectory();
const getDirectories = (path: string) => {
  console.log(path);
  return readdirSync(path)
    .map((name) => normalize(join(path, name)))
    .filter(isDirectory);
};

export const getDirectoriesReursively = (path: string): Array<string> => {
  let dirs = getDirectories(path);
  let files = dirs
    .map((dir) => getDirectoriesReursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(path));
};

const isFile = (path: string) => statSync(path).isFile();
const getFiles = (path: string) =>
  readdirSync(path)
    .map((name) => join(path, name))
    .filter(isFile);

const getFilesRecursively = (path: string): Array<string> => {
  let dirs = getDirectories(path);
  let files = dirs
    .map((dir) => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(path));
};
