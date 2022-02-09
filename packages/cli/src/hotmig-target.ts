#!/usr/bin/env node
const program = require("commander");

program.command("init <target>", "initialize a new target");
program.command("init-store <target>", "initialize a new migration store");

program.action(() => {
  program.help();
});
program.parse(process.argv);
