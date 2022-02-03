import invariant from "invariant";
import { DatabaseNotInitializedError } from "./errors";
import { AppliedMigration, MigrationFileContent } from "./models";

export abstract class Database {
  protected isInitalized = false;

  constructor(readonly connectionString: string | undefined) {
    invariant(connectionString, "connectionString is required");
  }

  ensureInitialized() {
    if (!this.isInitalized) {
      throw new DatabaseNotInitializedError();
    }
  }

  isInitialized() {
    return this.isInitalized;
  }

  abstract init(): Promise<void>;

  abstract createMigrationsTable(): Promise<void>;

  abstract getAppliedMigrations(): Promise<Array<AppliedMigration>>;

  abstract runSql(q: string): Promise<any>;

  abstract addMigration(migration: MigrationFileContent): Promise<void>;
}
