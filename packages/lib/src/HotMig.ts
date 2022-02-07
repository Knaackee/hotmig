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
import pino from "pino";

export interface HotMigConfig {
  driver: string;
  config: any;
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
  private logger = pino();

  constructor(private readonly target: string, root: string = process.cwd()) {
    this.baseDirectory = resolve(root, "./.migrations"); //?
    this.targetDirectory = resolve(this.baseDirectory, `./${target}`);
    this.devJsPath = resolve(this.targetDirectory, "./dev.js");
    this.commitDirectory = resolve(this.targetDirectory, "./commits");
    this.configFilePath = resolve(this.targetDirectory, "./hotmig.config.js");
  }

  isInitialized() {
    const result = existsSync(this.targetDirectory);
    pino().info(`isInitialized: ${result}`);
    return result;
  }

  createMigrationStore() {
    pino().info("createMigrationStore");
    return this.driver?.createMigrationStore();
  }

  migrationStoreExists() {
    pino().info("migrationStoreExists");
    return this.driver?.migrationStoreExists();
  }

  async init(driver: string, isInteractive?: boolean) {
    pino().info("init ", driver);
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
    pino().info("loadConfig");
    this.ensureInitialized();

    this.config = require(this.configFilePath);
    // TODO: check config

    // TODO: check driver
    const module = await requireGlobal(this.config?.driver ?? "");
    this.driver = new module["Driver"]() as Driver;

    this.driver?.init(this.config?.config);
  }

  getAppliedMigrations() {
    pino().info("getAppliedMigrations");
    this.ensureInitialized();
    return this.driver?.getAppliedMigrations(this.target);
  }

  async getLocalMigrations() {
    pino().info("getLocalMigrations");
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

  async pending() {
    pino().info("pending");
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

  async up(options: { count: number } = { count: 1 }) {
    pino().info("up");
    invariant(this.driver, "db is required");
    this.ensureInitialized();
    const pendingMigrations = await this.pending();
    let applied = 0;
    let migrations: Array<Migration> = [];

    await this.driver.exec(async (params) => {
      for (
        let i = 0;
        i !== Math.min(options.count, pendingMigrations.length);
        i++
      ) {
        const migration = pendingMigrations[i];

        const module = require(migration.filePath || "");
        validateMigrationModule(module);
        await module.up(params);
        await this.driver?.addMigration(migration);
        applied++;
        migrations.push(migration);
      }
    });

    return { applied, migrations };
  }

  async down(options: { count: number } = { count: 1 }) {
    pino().info("down");
    invariant(this.driver, "db is required");
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations =
      (await this.driver?.getAppliedMigrations(this.target)).reverse() || [];

    pino().info(`appliedMigrations: ${JSON.stringify(appliedMigrations)}`);
    pino().info(`localMigrations: ${JSON.stringify(localMigrations)}`);

    let applied = 0;
    let migrations: Array<Migration> = [];

    await this.driver.exec(async (params) => {
      for (
        let i = 0;
        i !== Math.min(options.count, appliedMigrations.length);
        i++
      ) {
        const migration = appliedMigrations[i];
        const localMigration = localMigrations.migrations.find((m) => {
          return m.id === migration?.id;
        });

        // TODO: Check if localMigration exists
        const module = require(localMigration?.filePath || "");
        validateMigrationModule(module);
        pino().info("running down " + localMigration?.filePath);
        await module.down(params);
        await this.driver?.removeMigration(migration.id);
        migrations.push(migration);
        applied++;
      }
    });

    return { applied, migrations };
  }

  latest() {
    pino().info("latest");
    return this.up({ count: Infinity });
  }

  reset() {
    pino().info("reset");
    return this.down({ count: Infinity });
  }

  async new(name: string, isInteractive?: boolean) {
    pino().info("new");
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
    pino().info("commit");
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

    // sorry only one commit per ms
    // we need this to avoid collisions of migration ids
    await new Promise((res) => setTimeout(res, 1));
    migration.id = generateId();
    // TODO: check module
    migration.name = require(this.devJsPath).name;
    migration.filePath = resolve(
      this.commitDirectory,
      `${migration.id}-${slugify(migration.name || "")}.js`
    );
    writeFileSync(migration.filePath, readFileSync(this.devJsPath).toString());
    unlinkSync(this.devJsPath);
    return migration;
  }

  async test() {
    pino().info("test");
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

    const devMigration = require(this.devJsPath);
    validateMigrationModule(module);

    let error: any = undefined;
    await this.driver?.exec(async (params) => {
      try {
        console.log("running up...");
        await devMigration.up(params);
        console.log("running down...");
        await devMigration.down(params);
        console.log("running up...");
        await devMigration.up(params);
        console.log("running down...");
        await devMigration.down(params);
      } catch (err) {
        error = err;
        pino().error(err);
      }
    });

    if (error) throw error;
  }

  ensureInitialized() {
    pino().info("ensureInitialized");
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
  }
}
function validateMigrationModule(module: any) {
  pino().info("validateMigrationModule");
}
