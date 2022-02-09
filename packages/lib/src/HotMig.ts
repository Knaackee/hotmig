import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  AlreadyInitializedError,
  InvalidConfigError,
  NotInitializedError,
} from "./errors";
import { Target } from "./Target";
const prettier = require("prettier");

export interface HotMigConfig {
  migrationsDir: string;
}

export class HotMig {
  configFilePath: string = "";
  config?: HotMigConfig;

  constructor(public path: string) {
    this.configFilePath = resolve(this.path, "hotmig.config.js");
  }

  async init(migrationsDir: string) {
    // check if already initialized
    if (this.isInitialized()) {
      throw new AlreadyInitializedError();
    }
    this.config = { migrationsDir };
    writeFileSync(
      this.configFilePath,
      prettier.format(`module.exports = ${JSON.stringify(this.config)}`, {
        semi: false,
        parser: "babel",
      })
    );
    if (!existsSync(resolve(this.path, this.config.migrationsDir))) {
      await mkdirSync(resolve(this.path, this.config.migrationsDir));
    }
  }

  async loadConfig() {
    // check if already initialized
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    // load config
    try {
      const config = require(this.configFilePath);
      if (!config.migrationsDir) {
        throw new InvalidConfigError(`migrationsDir not found in config`);
      }
      this.config = config;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  isInitialized() {
    // check if hotmig.config.js already exists
    return existsSync(this.configFilePath);
  }

  async target(name: string) {
    // check if already initialized
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }

    const result = new Target(name, this);
    if (result.isInitialized()) {
      await result.loadConfig();
    }
    return result;
  }
}
