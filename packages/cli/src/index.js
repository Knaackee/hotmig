#!/usr/bin/env node
const path = require("path");

const tsConfigPath = path.resolve(__dirname, "..");

require("ts-node").register({
  projectSearchDir: tsConfigPath,
  // tell ts-node where to find our local tsconfig.json and local typescript version
});
require("./hotmig.ts");

// import * as t from "ts-node";

// t.register({

// });
