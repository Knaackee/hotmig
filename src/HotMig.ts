import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import invariant from "invariant";
import { resolve } from "path";
import { Database } from "./Database";
import { AlreadyInitializedError, NotInitializedError } from "./errors";
import slugify from "slugify";
import {
  generateId,
  isValidMigrationContent,
  parseMigrationContent,
} from "./utils";
import { MigrationFileContent } from "./models";

export class HotMig {
  baseDirectory: string;
  commitDirectory: string;

  constructor(
    private readonly db?: Database,
    private readonly root: string = __dirname
  ) {
    invariant(db, "db is required");
    this.baseDirectory = resolve(root, "./migrations");
    this.commitDirectory = resolve(this.baseDirectory, "./commits");
  }

  isInitialized() {
    return existsSync(this.baseDirectory);
  }

  async init() {
    if (this.isInitialized()) {
      throw new AlreadyInitializedError();
    }
    mkdirSync(this.baseDirectory);
    mkdirSync(this.commitDirectory);
  }

  async getLocalMigrations() {
    return readdirSync(this.commitDirectory).map((file) => {
      const migration = parseMigrationContent(
        readFileSync(resolve(this.commitDirectory, file)).toString()
      );
      migration.id = file.split("-")[0];
      migration.name = file.split("-")[1].split(".")[0];
      return migration;
    });
  }

  async createLocalMigration(
    content?: string,
    options: CreateMigrationOptions = { allowEmpty: false }
  ): Promise<MigrationFileContent> {
    this.ensureInitialized();
    invariant(content, "migration content is required");
    if (!isValidMigrationContent(content)) {
      throw new Error("migration content is invalid");
    }
    const migration = parseMigrationContent(content);
    invariant(migration.name, "migration name is empty");
    if (
      !options.allowEmpty &&
      migration.upSql?.trim() === "" &&
      migration.downSql?.trim() === ""
    ) {
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

  async up() {
    this.ensureInitialized();
    const localMigrations = await this.getLocalMigrations();
    const appliedMigrations = (await this.db?.getAppliedMigrations()) || [];
    const toRun = localMigrations.filter((migration) => {
      return !appliedMigrations.find((lm) => lm.id === migration.id);
    });
    for (const migration of toRun) {
      console.log(`running migration: ` + migration.upSql);
      await this.db?.runSql(migration.upSql || "");
      await this.db?.addMigration(migration);
    }
  }

  ensureInitialized() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
  }
}

interface CreateMigrationOptions {
  allowEmpty?: boolean;
}
