import invariant from "invariant";
import {
  DatabaseAlreadyInitializedError,
  DatabaseNotInitializedError,
} from "./errors";
import { AppliedMigration, MigrationFileContent } from "./models";
import { Knex, knex } from "knex";

export abstract class Database {
  protected isInitalized = false;
  private client: Knex<any, unknown[]> | undefined = undefined;

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

  init() {
    if (this.isInitalized) {
      throw new DatabaseAlreadyInitializedError();
    }
    this.client = this.createClient();
    this.isInitalized = true;
  }

  setClient(client: Knex<any, unknown[]> | undefined) {
    if (this.isInitalized) {
      throw new DatabaseAlreadyInitializedError();
    }
    this.client = client;
    this.isInitalized = true;
  }

  getClient() {
    this.ensureInitialized();
    return this.client!;
  }

  async dispose() {
    this.ensureInitialized();
    await this.client?.destroy();
    this.isInitalized = false;
  }

  abstract createClient(): Knex<any, unknown[]>;

  abstract createMigrationsTable(): Promise<void>;

  abstract migrationsTableExists(): Promise<boolean>;

  abstract getAppliedMigrations(): Promise<Array<AppliedMigration>>;

  abstract addMigration(migration: MigrationFileContent): Promise<void>;

  abstract removeMigration(id: string): Promise<void>;
}
