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
import pino from "pino";
import slugify from "slugify";
import { HotMig } from ".";
import { Driver } from "./Driver";
import * as path from "path";
import execa from "execa";
import ora from "ora";
import {
  AlreadyInitializedError,
  DevMigrationAlreadyExistsError,
  DevMigrationInvalidError,
  DevMigrationNotExistsError,
  InvalidConfigError,
  InvalidDriverError,
  LocalMigrationNotFound,
  NotInitializedError,
  PendingMigrationsError,
} from "./errors";
import { Migration } from "./models";
import { requireGlobal } from "./utils";
import { generateId, isValidMigrationContent } from "./utils/utils";
const prettier = require("prettier");
import chai from "chai";

const getModule = async (p: string) => {
  if (!existsSync(p)) {
    throw new Error("File does not exist");
  }

  const module = await import(p);
  // delete require cache
  delete require.cache[p];

  return module;
};

export interface TargetConfig {
  driver: string;
  config: any;
  commitDirectory?: string | Array<string>;
  dev?: {
    runAfter?: () => Promise<void>;
  };
}

export interface OnProgressArgs {
  applied: number;
  migrations: Array<Migration>;
  total: number;
}

export interface TestOnProgressArgs {
  action: "up" | "down";
  run: number;
}

const ensureDirectoriesExists = (paths: Array<string>) => {
  paths.forEach((p) => {
    if (!existsSync(p)) {
      mkdirSync(p);
    }
  });
};

export const loadDriver = async (driver: string) => {
  // check driver
  try {
    const module = await requireGlobal(driver);
    if (!module["Driver"]) {
      throw new InvalidDriverError(driver);
    }
    return module;
  } catch (err) {
    console.log(err);
    throw new InvalidDriverError(driver);
  }
};

export interface MigrationModule {
  up: (client: any) => Promise<void>;
  down: (client: any) => Promise<void>;
}

export const loadMigrationModule = async (p: string) => {
  if (!existsSync(p)) {
    throw new Error("File does not exist");
  }

  const module = await import(p);
  // delete require cache
  delete require.cache[p];

  return module;
};

export const validateMigrationModule = (
  migration?: Migration,
  logger?: pino.Logger
) => {
  logger?.info("validateMigrationModule");
};

export class Target {
  baseDirectory: string;
  targetDirectory: string;
  commitDirectory: string | Array<string>;
  configFilePath: string;
  devJsPath: string;
  prevJsPath: string;
  config: TargetConfig | undefined;
  driver: Driver | undefined = undefined;
  driverName?: string;
  private logger = pino();

  constructor(
    private readonly target: string,
    hotmig: HotMig,
    logLevel:
      | "fatal"
      | "error"
      | "warn"
      | "info"
      | "debug"
      | "trace"
      | "silent" = "silent"
  ) {
    this.baseDirectory = resolve(
      hotmig.path,
      hotmig.config?.migrationsDir ?? ""
    );
    this.targetDirectory = resolve(this.baseDirectory, `./${target}`);
    this.devJsPath = resolve(this.targetDirectory, "./dev.ts");
    this.prevJsPath = resolve(this.targetDirectory, "./prev.dev.ts");
    this.commitDirectory = resolve(this.targetDirectory, "./commits");
    this.configFilePath = resolve(this.targetDirectory, "./target.config.js");
    this.logger = pino({ level: logLevel });
  }

  isInitialized() {
    const result = existsSync(this.targetDirectory);
    this.logger.info(`isInitialized: ${result}`);
    return result;
  }

  createMigrationStore() {
    this.logger.info("createMigrationStore");
    return this.driver?.createMigrationStore();
  }

  migrationStoreExists() {
    this.logger.info("migrationStoreExists");
    return this.driver?.migrationStoreExists();
  }

  async init(driver: string, isInteractive?: boolean) {
    this.logger.info("init ", driver);
    if (this.isInitialized()) {
      throw new AlreadyInitializedError();
    }

    const module = await loadDriver(driver);
    this.driver = new module["Driver"]() as Driver;
    this.driverName = driver;

    if (!existsSync(this.baseDirectory)) {
      throw new NotInitializedError();
    }

    mkdirSync(this.targetDirectory);
    ensureDirectoriesExists(
      typeof this.commitDirectory === "string"
        ? [this.commitDirectory]
        : this.commitDirectory
    );

    const config = {
      driver,
      commitDirecotry: this.commitDirectory,
      config: await this.driver?.getDefaultConfig(isInteractive),
    };

    writeFileSync(
      this.configFilePath,
      prettier.format(`module.exports = ${JSON.stringify(config)}`, {
        semi: false,
        parser: "babel",
      })
    );

    this.config = config;
  }

  async setDriver(driver: Driver) {
    this.driver = driver;
  }

  async loadConfig() {
    this.logger.info("loadConfig");
    this.ensureInitialized();

    this.config = require(this.configFilePath);

    const module = await loadDriver(this.config?.driver ?? "");
    this.driver = new module["Driver"]() as Driver;
    this.driverName = this.config?.driver;

    // override default if provided in target.config.js
    this.commitDirectory = this.config?.commitDirectory || this.commitDirectory;

    this.driver?.init(this.config?.config);
  }

  getAppliedMigrations() {
    this.logger.info("getAppliedMigrations");
    this.ensureInitialized();
    return this.driver?.getAppliedMigrations(this.target);
  }

  async getLocalMigrations() {
    this.logger.info("getLocalMigrations");
    const result = {
      loaded: 0,
      skipped: 0,
      migrations: Array<Migration>(),
    };
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }

    result.migrations = [];

    const migrationDirectories =
      typeof this.commitDirectory === "string"
        ? [this.commitDirectory]
        : this.commitDirectory;
    ensureDirectoriesExists(migrationDirectories);

    migrationDirectories.forEach((d) => {
      readdirSync(d).forEach((file) => {
        if (file.toLocaleLowerCase().endsWith(".ts")) {
          try {
            if (isValidMigrationContent(resolve(d, file))) {
              const regex = new RegExp("// @name:(?<name>[^\n]*)\n").exec(
                readFileSync(resolve(d, file)).toString()
              );
              const name = regex?.groups?.name;
              if (!name) {
                throw new DevMigrationInvalidError();
              }

              const migration = {} as Migration;
              migration.id = file.split("-")[0];
              migration.name = name?.trim();
              migration.filePath = resolve(d, file);
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
    });
    // sort by id asc
    result.migrations.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });

    return result;
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

  async up(
    options: {
      count: number;
      onProgress?: (args: OnProgressArgs) => Promise<void>;
    } = { count: 1 }
  ) {
    this.logger.info("up");
    this.ensureInitialized();
    const pendingMigrations = await this.pending();
    let applied = 0;
    let migrations: Array<Migration> = [];

    await this.driver?.exec(async (params) => {
      for (
        let i = 0;
        i !== Math.min(options.count, pendingMigrations.length);
        i++
      ) {
        const migration = pendingMigrations[i];

        const module = await loadMigrationModule(migration.filePath || "");
        await module?.up(params);
        await this.driver?.addMigration(migration);
        applied++;
        migrations.push(migration);

        await options?.onProgress?.({
          applied,
          migrations,
          total: Math.min(pendingMigrations.length, options.count),
        });
      }
    });

    return { applied, migrations };
  }

  async down(
    options: {
      count: number;
      onProgress?: (args: OnProgressArgs) => Promise<void>;
    } = { count: 1 }
  ) {
    this.logger.info("down");
    invariant(this.driver, "db is required");
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations =
      (await this.driver?.getAppliedMigrations(this.target)).reverse() || [];

    this.logger.info(`appliedMigrations: ${JSON.stringify(appliedMigrations)}`);
    this.logger.info(`localMigrations: ${JSON.stringify(localMigrations)}`);

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

        if (!existsSync(localMigration?.filePath ?? "")) {
          throw new LocalMigrationNotFound(localMigration?.filePath ?? "");
        }

        const module = await loadMigrationModule(
          localMigration?.filePath ?? ""
        );
        this.logger.info("running down " + localMigration?.filePath);
        try {
          await module?.down(params);
        } catch (e) {
          console.log(e);
        }

        // give params to function. e.g. if params contains the sql client and we want to use the transaction
        await this.driver?.removeMigration(migration.id, params);
        migrations.push(migration);
        applied++;

        await options?.onProgress?.({
          applied,
          migrations,
          total: Math.min(
            appliedMigrations.length,
            Math.min(options.count, options.count)
          ),
        });
      }
    });

    return { applied, migrations };
  }

  latest(options?: { onProgress?: (args: OnProgressArgs) => Promise<void> }) {
    this.logger.info("latest");
    return this.up({ count: Infinity, onProgress: options?.onProgress });
  }

  reset(options?: { onProgress?: (args: OnProgressArgs) => Promise<void> }) {
    this.logger.info("reset");
    return this.down({ count: Infinity, onProgress: options?.onProgress });
  }

  async new(name: string, isInteractive?: boolean) {
    this.logger.info("new");
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (this.devMigationAlreadyExists()) {
      throw new DevMigrationAlreadyExistsError();
    }
    const content = await this.driver?.getEmptyMigrationContent(
      name,
      isInteractive
    );
    writeFileSync(this.devJsPath, content ?? "");
  }

  devMigationAlreadyExists() {
    return existsSync(this.devJsPath);
  }

  async commit() {
    this.logger.info("commit");
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (!this.devMigationAlreadyExists()) {
      throw new DevMigrationNotExistsError();
    }
    if (!isValidMigrationContent(this.devJsPath)) {
      throw new DevMigrationInvalidError();
    }

    const migration = {} as Migration;

    // get name from dev.js
    const devJsContent = readFileSync(this.devJsPath).toString();
    const result = new RegExp("// @name:(?<name>[^\n]*)\n").exec(devJsContent);
    const name = result?.groups?.name;
    if (!name) {
      throw new DevMigrationInvalidError();
    }

    // sorry only one commit per ms
    // we need this to avoid collisions of migration ids
    await new Promise((res) => setTimeout(res, 1));
    migration.id = generateId();
    migration.name = name;
    migration.filePath = resolve(
      typeof this.commitDirectory === "string"
        ? this.commitDirectory
        : this.commitDirectory[0],
      `${migration.id}-${slugify(migration.name || "")}.ts`
    );

    // add migration (e.g. add to db migrations table)
    await this.driver?.addMigration(migration);

    // add tests to tests.json
    const module = await getModule(this.devJsPath);

    // get tests
    const test = module["testAfter"]?.({}, chai);

    // load tests.json
    const testsJsonPath = resolve(
      typeof this.commitDirectory === "string"
        ? this.commitDirectory
        : this.commitDirectory[0],
      "..",
      "tests.json"
    );
    let testsJson: any = [];
    if (existsSync(testsJsonPath)) {
      testsJson = JSON.parse(readFileSync(testsJsonPath).toString());
    } else {
      writeFileSync(testsJsonPath, JSON.stringify(testsJson));
    }

    // add test to tests.json
    testsJson.push({
      commit: migration.id + "-" + slugify(migration.name || ""),
      tests: Object.keys(test || {}).map((key) => {
        return {
          name: key,
        };
      }),
    });

    // write tests.json
    writeFileSync(testsJsonPath, JSON.stringify(testsJson));

    // write migration
    writeFileSync(migration.filePath, devJsContent);

    // remove dev migration
    unlinkSync(this.devJsPath);

    // remove prev migration if exists
    if (existsSync(this.prevJsPath)) unlinkSync(this.prevJsPath);

    // return migration
    return migration;
  }

  async test(
    isDevMode: boolean = false,
    onProgress?: (args: TestOnProgressArgs) => Promise<void>
  ) {
    this.logger.info("test");
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (!this.devMigationAlreadyExists()) {
      throw new DevMigrationNotExistsError();
    }
    if (!isValidMigrationContent(this.devJsPath)) {
      throw new DevMigrationInvalidError();
    }

    // check if there are pending migrations
    const pending = await this.pending();
    if (pending.length > 0) {
      throw new PendingMigrationsError();
    }

    const devMigration = await loadMigrationModule(this.devJsPath);

    let error: any = undefined;
    await this.driver?.exec(async (params) => {
      try {
        await onProgress?.({
          action: "up",
          run: 1,
        });
        await devMigration?.up(params);

        await onProgress?.({
          action: "down",
          run: 1,
        });
        await devMigration?.down(params);

        await onProgress?.({
          action: "up",
          run: 2,
        });
        await devMigration?.up(params);

        // TODO: Test all

        await onProgress?.({
          action: "down",
          run: 2,
        });
        await devMigration?.down(params);
      } catch (err) {
        error = err;
        this.logger.error(err);
      }
    });

    return error;
  }

  ensureInitialized() {
    this.logger.info("ensureInitialized");
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
  }
}
