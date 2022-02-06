import { Pool, PoolClient } from "pg";
import { AppliedMigration, Driver as Base, Migration } from "@hotmig/lib";
import { Knex, knex } from "knex";
export class Driver extends Base {
  readonly schema: string | null;
  client: Knex<any, unknown[]> | undefined;

  constructor() {
    super();
    var url = new URL(process.env.CONNECTION_STRING || "");
    this.schema = url.searchParams.get("schema");
    // this.client = this.createClient();
    if (!this.schema) {
      throw new Error(`"schema" is missing in connection string`);
    }
  }

  async init(config: any) {
    this.client = this.createClient(config.connectionString);
  }

  async getDefaultConfig(isInteractive?: boolean): Promise<any> {
    return {
      connectionString:
        "postgresql://postgres:postgres@localhost:5432/db?schema=testing",
    };
  }

  async migrationStoreExists() {
    const result = await this.client?.raw(
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

  async createMigrationStore() {
    await this.client?.raw(/* sql */ `
      CREATE TABLE IF NOT EXISTS "${this.schema}"."migrations" (
        id varchar(68) NOT NULL,
        "name" text NOT NULL,
        created_at timestamptz(0) NOT NULL DEFAULT now(),
        CONSTRAINT migrations_pk PRIMARY KEY (id)
      );
   `);
  }

  async getAppliedMigrations() {
    const result = await this.client?.raw(/*sql*/ `
      SELECT id, name, created_at FROM "${this.schema}"."migrations"
      order by created_at asc;
    `);

    return result?.rows as Array<AppliedMigration>;
  }

  async addMigration(migration: Migration) {
    const params = { id: migration.id, name: migration.name };
    await this.client?.raw(
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
    await this.client?.raw(
      /* sql */ `
      DELETE FROM "${this.schema}"."migrations" 
      WHERE id = ?;
   `,
      [id]
    );
  }

  async exec(cb: (params: any) => Promise<void>) {
    // prepare database
    // generate params
    // call cb
    // destroy database connection
  }

  createClient(connectionString: string) {
    return knex({
      client: "pg",
      connection: connectionString,
      searchPath: [this.schema || "public"],
    });
  }

  async getEmptyMigrationContent(
    name: string,
    isInteractive?: boolean
  ): Promise<string> {
    return `module.exports = {
      name: '${name}',
    }`;
  }
}
