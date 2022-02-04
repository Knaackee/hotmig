import { Pool, PoolClient } from "pg";
import {
  AppliedMigration,
  Database as Base,
  DatabaseAlreadyInitializedError,
  MigrationFileContent,
} from "@hotmig/lib";
import { Knex, knex } from "knex";
export class Database extends Base {
  readonly schema: string | null;

  constructor(connectionString: string | undefined) {
    super(connectionString);
    var url = new URL(connectionString || "");
    this.schema = url.searchParams.get("schema");
    if (!this.schema) {
      throw new Error(`"schema" is missing in connection string`);
    }
  }

  async migrationsTableExists() {
    this.ensureInitialized();

    const result = await this.getClient().raw(
      /*sql*/ `
      SELECT EXISTS (
        SELECT FROM "pg_tables"
        WHERE schemaname = ?
        AND tablename  = 'migrations'
      );    
    `,
      [this.schema]
    );
    return result?.rows[0].exists;
  }

  async createMigrationsTable() {
    this.ensureInitialized();

    await this.getClient().raw(/* sql */ `
      CREATE TABLE IF NOT EXISTS "${this.schema}"."migrations" (
        id varchar(68) NOT NULL,
        "name" text NOT NULL,
        created_at timestamptz(0) NOT NULL DEFAULT now(),
        CONSTRAINT migrations_pk PRIMARY KEY (id)
      );
   `);
  }

  async getAppliedMigrations() {
    this.ensureInitialized();

    const result = await this.getClient().raw(/*sql*/ `
      SELECT id, name, created_at FROM "${this.schema}"."migrations"
      order by created_at asc;
    `);

    return result?.rows as Array<AppliedMigration>;
  }

  async addMigration(migration: MigrationFileContent) {
    this.ensureInitialized();
    const params = { id: migration.id, name: migration.name };
    await this.getClient()?.raw(
      /* sql */ `
      INSERT INTO "${this.schema}"."migrations" 
      (id, "name")
      values 
      (?, ?);
   `,
      [params.id || "", params.name || ""]
    );
  }

  async removeMigration(id: string): Promise<void> {
    this.ensureInitialized();

    await this.getClient()?.raw(
      /* sql */ `
      DELETE FROM "${this.schema}"."migrations" 
      WHERE id = ?;
   `,
      [id]
    );
  }

  createClient() {
    return knex({
      client: "pg",
      connection: this.connectionString,
      searchPath: [this.schema || "public"],
    });
  }
}
