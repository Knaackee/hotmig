import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import invariant from "invariant";
import { resolve } from "path";
import { AlreadyInitializedError, NotInitializedError } from "./errors";
import slugify from "slugify";
import { Migration } from "./models";
import { generateId, isValidMigrationContent } from "./utils/utils";
import { Driver } from "./Driver";
import { requireGlobal } from "./utils";

export interface HotMigConfig {
  driver: string;
}

export class HotMig {
  baseDirectory: string;
  targetDirectory: string;
  commitDirectory: string;
  configFilePath: string;
  devJsPath: string;
  config: HotMigConfig | undefined;
  driver: Driver | undefined = undefined;
  driverName?: string;

  constructor(private readonly target: string, root: string = process.cwd()) {
    this.baseDirectory = resolve(root, "./.migrations"); //?
    this.targetDirectory = resolve(this.baseDirectory, `./${target}`);
    this.devJsPath = resolve(this.targetDirectory, "./dev.js");
    this.commitDirectory = resolve(this.targetDirectory, "./commits");
    this.configFilePath = resolve(this.targetDirectory, "./hotmig.config.js");
  }

  isInitialized() {
    return existsSync(this.targetDirectory);
  }

  setDriver(driver: Driver) {
    this.driver = driver;
  }

  createMigrationStore() {
    return this.driver?.createMigrationStore();
  }

  async init(driver: string, isInteractive?: boolean) {
    if (this.isInitialized()) {
      throw new AlreadyInitializedError();
    }
    if (!existsSync(this.baseDirectory)) {
      mkdirSync(this.baseDirectory);
    }
    mkdirSync(this.targetDirectory);
    mkdirSync(this.commitDirectory);

    // TODO: check driver
    const module = await requireGlobal(driver);
    this.driver = new module["Driver"]() as Driver;
    this.driverName = driver;

    const config = {
      driver,
      config: await this.driver?.getDefaultConfig(isInteractive),
    };

    writeFileSync(
      this.configFilePath,
      `module.exports = ${JSON.stringify(config)}`
    );

    this.config = config;
  }

  async loadConfig() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    this.config = require(this.configFilePath);
    this.driver?.init(this.config);
  }

  async getLocalMigrations() {
    const result = {
      loaded: 0,
      skipped: 0,
      migrations: Array<Migration>(),
    };
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }

    result.migrations = [];
    readdirSync(this.commitDirectory).forEach((file) => {
      if (file.toLocaleLowerCase().endsWith(".js")) {
        try {
          if (isValidMigrationContent(resolve(this.commitDirectory, file))) {
            const migration = {} as Migration;
            migration.id = file.split("-")[0];
            migration.name = file.split("-")[1].split(".")[0];
            migration.filePath = resolve(this.commitDirectory, file);
            migration.target = this.target;
            result.loaded++;
            result.migrations.push(migration);
          } else {
            result.skipped++;
          }
        } catch (e) {
          result.skipped++;
        }
      } else {
        result.skipped++;
      }
    });
    return result;
  }

  async up(options: { all: boolean } = { all: false }) {
    invariant(this.driver, "db is required");
    this.ensureInitialized();
    const toRun = await this.pending();
    let applied = 0;

    console.log(toRun);

    await this.driver.exec(async (params) => {
      for (const migration of toRun) {
        const module = require(migration.filePath || "");
        // TODO: check module

        await module.up(params);

        console.log(module);
      }
    });

    // TODO: FIX
    // for (const migration of toRun) {
    //   const client = await this.driver?.getClient();
    //   await client.raw(migration.upSql || "");
    //   await this.driver?.addMigration(migration);
    //   applied++;
    //   if (!options.all) {
    //     break;
    //   }
    // }
    return { applied };
  }

  async pending() {
    invariant(this.driver, "db is required");
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations =
      (await this.driver?.getAppliedMigrations(this.target)) || [];

    const toRun = localMigrations.migrations.filter((migration) => {
      return !appliedMigrations.find((lm: any) => lm.id === migration.id);
    });
    return toRun;
  }

  async down() {
    invariant(this.driver, "db is required");
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations =
      (await this.driver?.getAppliedMigrations(this.target)) || [];

    let applied = 0;
    const lastApplied = appliedMigrations.pop();
    const migration = localMigrations.migrations.find((migration) => {
      return migration.id === lastApplied?.id;
    });
    // TODO: FIX
    // if (migration) {
    //   const client = await this.driver?.getClient();
    //   await client.raw(migration.downSql || "");
    //   await this.driver?.removeMigration(migration.id || "");
    //   applied++;
    // }
    return { applied };
  }

  async latest() {
    return this.up({ all: true });
  }

  async new(name: string, isInteractive?: boolean) {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (existsSync(this.devJsPath)) {
      throw new Error("dev.js already exists");
    }
    const content = await this.driver?.getEmptyMigrationContent(
      name,
      isInteractive
    );
    writeFileSync(this.devJsPath, content ?? "");
  }

  async commit() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (!existsSync(this.devJsPath)) {
      throw new Error("dev.js does not exist");
    }
    if (!isValidMigrationContent(this.devJsPath)) {
      throw new Error("dev.js is invalid");
    }

    const migration = {} as Migration;
    migration.id = generateId();
    migration.filePath = resolve(
      this.commitDirectory,
      `${migration.id}-${slugify(migration.name || "")}.js`
    );
    writeFileSync(migration.filePath, readFileSync(this.devJsPath).toString());
    unlinkSync(this.devJsPath);
    return migration;
  }

  async test() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (!existsSync(this.devJsPath)) {
      throw new Error("dev.js does not exist");
    }
    if (!isValidMigrationContent(this.devJsPath)) {
      throw new Error("dev.js is invalid " + this.devJsPath);
    }

    // check if there are pending migrations
    const pending = await this.pending();
    if (pending.length > 0) {
      throw new Error("there are pending migrations, cant test");
    }

    // TODO: FIX
    // const client = await this.driver?.getClient();

    // console.log("up");
    // await client.raw(migration.upSql || "");
    // console.log("down");
    // await client.raw(migration.downSql || "");

    // console.log("up");
    // await client.raw(migration.upSql || "");
    // console.log("down");
    // await client.raw(migration.downSql || "");
  }

  ensureInitialized() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
  }
}
