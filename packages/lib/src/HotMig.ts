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
import { Database } from "./Database";
import { AlreadyInitializedError, NotInitializedError } from "./errors";
import slugify from "slugify";
import { MigrationFileContent } from "./models";
import {
  generateId,
  isValidMigrationContent,
  parseMigrationContent,
} from "./utils/utils";

export interface HotMigConfig {
  driver: string;
}

export class HotMig {
  baseDirectory: string;
  commitDirectory: string;
  configFilePath: string;
  devSqlPath: string;
  config: HotMigConfig | undefined;
  db: Database | undefined = undefined;

  constructor(root: string = process.cwd()) {
    this.baseDirectory = resolve(root, "./.migrations");
    this.devSqlPath = resolve(this.baseDirectory, "./dev.sql");
    this.commitDirectory = resolve(this.baseDirectory, "./commits");
    this.configFilePath = resolve(root, "./hotmig.config.js");
  }

  isInitialized() {
    return existsSync(this.baseDirectory);
  }

  setDatabase(db: Database) {
    this.db = db;
  }

  async init(config: HotMigConfig) {
    if (this.isInitialized()) {
      throw new AlreadyInitializedError();
    }
    mkdirSync(this.baseDirectory);
    mkdirSync(this.commitDirectory);
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
  }

  async getLocalMigrations() {
    const result = {
      loaded: 0,
      skipped: 0,
      migrations: Array<MigrationFileContent>(),
    };
    result.migrations = [];
    readdirSync(this.commitDirectory).forEach((file) => {
      if (file.toLocaleLowerCase().endsWith(".sql")) {
        try {
          const content = readFileSync(
            resolve(this.commitDirectory, file)
          ).toString();
          if (isValidMigrationContent(content)) {
            const migration = parseMigrationContent(content);
            migration.id = file.split("-")[0];
            migration.name = file.split("-")[1].split(".")[0];
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

  async createLocalMigration(content?: string): Promise<MigrationFileContent> {
    this.ensureInitialized();
    invariant(content, "migration content is required");
    if (!isValidMigrationContent(content)) {
      throw new Error("migration content is invalid");
    }
    const migration = parseMigrationContent(content);
    invariant(migration.name, "migration name is empty");
    if (migration.upSql?.trim() === "" && migration.downSql?.trim() === "") {
      throw new Error("migration content is empty");
    }
    migration.id = generateId();
    migration.filePath = resolve(
      this.commitDirectory,
      `${migration.id}-${slugify(migration.name || "")}.sql`
    );
    writeFileSync(migration.filePath, content);
    return migration;
  }

  async up(options: { all: boolean } = { all: false }) {
    invariant(this.db, "db is required");
    this.ensureInitialized();
    const toRun = await this.pending();
    let applied = 0;
    for (const migration of toRun) {
      const client = await this.db?.getClient();
      await client.raw(migration.upSql || "");
      await this.db?.addMigration(migration);
      applied++;
      if (!options.all) {
        break;
      }
    }
    return { applied };
  }

  async pending() {
    invariant(this.db, "db is required");
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations = (await this.db?.getAppliedMigrations()) || [];
    const toRun = localMigrations.migrations.filter((migration) => {
      return !appliedMigrations.find((lm) => lm.id === migration.id);
    });
    return toRun;
  }

  async down() {
    invariant(this.db, "db is required");
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations = (await this.db?.getAppliedMigrations()) || [];

    let applied = 0;
    const lastApplied = appliedMigrations.pop();
    const migration = localMigrations.migrations.find((migration) => {
      return migration.id === lastApplied?.id;
    });
    if (migration) {
      const client = await this.db?.getClient();
      await client.raw(migration.downSql || "");
      await this.db?.removeMigration(migration.id || "");
      applied++;
    }
    return { applied };
  }

  async latest() {
    return this.up({ all: true });
  }

  async new(name: string) {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (existsSync(this.devSqlPath)) {
      throw new Error("dev.sql already exists");
    }
    writeFileSync(this.devSqlPath, getEmptyMigrationContent(name));
  }

  async commit() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (!existsSync(this.devSqlPath)) {
      throw new Error("dev.sql does not exist");
    }
    const content = readFileSync(this.devSqlPath).toString();
    if (!isValidMigrationContent(content)) {
      throw new Error("dev.sql is invalid");
    }
    const result = await this.createLocalMigration(content);
    unlinkSync(this.devSqlPath);
    return result;
  }

  async test() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
    if (!existsSync(this.devSqlPath)) {
      throw new Error("dev.sql does not exist");
    }
    const content = readFileSync(this.devSqlPath).toString();
    if (!isValidMigrationContent(content)) {
      throw new Error("dev.sql is invalid");
    }
    invariant(this.db, "db is required");
    const migration = parseMigrationContent(content);

    // check if there are pending migrations
    const pending = await this.pending();
    if (pending.length > 0) {
      throw new Error("there are pending migrations, cant test");
    }

    const client = await this.db?.getClient();

    console.log("up");
    await client.raw(migration.upSql || "");
    console.log("down");
    await client.raw(migration.downSql || "");

    console.log("up");
    await client.raw(migration.upSql || "");
    console.log("down");
    await client.raw(migration.downSql || "");
  }

  ensureInitialized() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
  }
}

const getEmptyMigrationContent = (
  name: string
) => `--------------------------------
-- Migration: ${name}
--------------------------------

-- UP

-- DOWN
`;
