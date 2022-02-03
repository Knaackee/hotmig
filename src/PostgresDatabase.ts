import { Pool, PoolClient } from "pg";
import { Database } from "./Database";
import { DatabaseAlreadyInitializedError } from "./errors";
import { AppliedMigration, MigrationFileContent } from "./models";

export class PostgresDatabase extends Database {
  readonly pool: Pool;
  public client: PoolClient | undefined;
  readonly schema: string | null;

  constructor(connectionString: string | undefined) {
    super(connectionString);
    this.pool = new Pool({
      connectionString,
    });

    var url = new URL(connectionString || "");
    this.schema = url.searchParams.get("schema");
    if (!this.schema) {
      throw new Error(`"schema" is missing in connection string`);
    }
  }

  async init() {
    if (this.isInitalized) {
      throw new DatabaseAlreadyInitializedError();
    }
    this.client = await this.pool.connect();
    this.isInitalized = true;
  }

  setClient(client?: PoolClient) {
    if (this.isInitalized) {
      throw new DatabaseAlreadyInitializedError();
    }
    this.client = client;
    this.isInitalized = true;
  }

  async dispose() {
    this.ensureInitialized();

    await this.client?.release();
    await this.pool.end();
    this.isInitalized = false;
  }

  async migrationsTableExists() {
    this.ensureInitialized();

    const result = await this.client?.query(
      /*sql*/ `
      SELECT EXISTS (
        SELECT FROM "pg_tables"
        WHERE schemaname = $1
        AND tablename  = 'migrations'
      );    
    `,
      [this.schema]
    );
    return result?.rows[0].exists;
  }

  async createMigrationsTable() {
    this.ensureInitialized();

    await this.client?.query(/* sql */ `
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

    const result = await this.client?.query(/*sql*/ `
      SELECT id, name, created_at FROM "${this.schema}"."migrations"
      order by created_at asc;
    `);

    return result?.rows as Array<AppliedMigration>;
  }

  async addMigration(migration: MigrationFileContent) {
    this.ensureInitialized();

    await this.client?.query(
      /* sql */ `
      INSERT INTO "${this.schema}"."migrations" 
      (id, "name")
      values 
      ($1, $2);
   `,
      [migration.id, migration.name]
    );
  }

  runSql(q: string): Promise<any> {
    return this.client?.query(q) as any;
  }
}
