import { existsSync, unlinkSync, writeFileSync } from "fs";
import { resolve } from "path";

const logModules = () => {
  console.log(
    Object.keys(require.cache).filter((x) => x.indexOf("node_modules") === -1)
  );
};

const filePath = "/tmp/test.js";

// lets write a module
writeFileSync(filePath, "module.exports = 'test';");
console.log(existsSync(filePath)); // true
console.log(require(filePath)); // 'test'
unlinkSync(filePath); // true

logModules(); // tmp/test.js is there as expected
delete require.cache[resolve(filePath)];
logModules(); // tmp/test.js is gone

// lets write a different module but at the same file path a.k.a changing
writeFileSync(filePath, "module.exports = 'second test';");
console.log(existsSync(filePath)); // true
console.log(require(filePath)); // 'test second'
unlinkSync(filePath); // true
