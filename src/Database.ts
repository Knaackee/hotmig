import invariant from "invariant";
import { DatabaseNotInitializedError } from "./errors";
import { AppliedMigration } from "./models";

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

  abstract createMigrationsTable(): Promise<void>;

  abstract getApliedMigrations(): Promise<Array<AppliedMigration>>;
}
