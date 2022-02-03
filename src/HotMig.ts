import { existsSync, mkdirSync, writeFileSync } from "fs";
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

  init() {
    if (this.isInitialized()) {
      throw new AlreadyInitializedError();
    }
    mkdirSync(this.baseDirectory);
    mkdirSync(this.commitDirectory);
  }
  getLocalMigrations() {
    throw new Error("Method not implemented.");
  }

  async createMigration(content?: string): Promise<MigrationFileContent> {
    this.ensureInitialized();
    invariant(content, "migration content is required");
    if (!isValidMigrationContent(content)) {
      throw new Error("migration content is invalid");
    }
    const migration = parseMigrationContent(content);
    migration.id = generateId();
    migration.filePath = resolve(
      this.commitDirectory,
      `${migration.id}-${slugify(migration.name || "")}.sql`
    );
    writeFileSync(migration.filePath, content);
    return migration;
  }

  ensureInitialized() {
    if (!this.isInitialized()) {
      throw new NotInitializedError();
    }
  }
}
