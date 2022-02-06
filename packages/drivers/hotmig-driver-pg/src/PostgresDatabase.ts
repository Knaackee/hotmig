import { Driver as Base, Migration } from "@hotmig/lib";
import { Knex, knex } from "knex";

class SqlDriver extends Base {
  private schema: string | null = "public";
  client: Knex<any, unknown[]> | undefined;

  constructor() {
    super();
  }

  async init(config: any) {
    var url = new URL(config.connectionString);
    this.schema = url.searchParams.get("schema");
    // this.client = this.createClient();
    if (!this.schema) {
      throw new Error(`"schema" is missing in connection string`);
    }

    this.client = this.createClient(config.connectionString);
  }

  async getDefaultConfig(isInteractive?: boolean): Promise<any> {
    return {
      connectionString:
        "postgresql://postgres:postgres@localhost:5432/db?schema=testing",
    };
  }

  async migrationStoreExists() {
    return this.client?.schema.hasTable("migrations") ?? false;
  }

  async createMigrationStore() {
    return this.client?.schema.createTable("migrations", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.timestamp("created_at").defaultTo(this.client?.fn.now() as any);
    });
  }

  async getAppliedMigrations() {
    const result = await this.client
      ?.select("id", "name", "created_at as createdAt")
      .from("migrations")
      .orderBy("created_at", "asc");
    return (
      result?.map((row) => {
        return {
          id: row.id,
          name: row.name,
          createdAt: row.createdAt,
        };
      }) ?? []
    );
  }

  async addMigration(migration: Migration) {
    await this.client
      ?.insert({ id: migration.id, name: migration.name })
      .into("migrations");
  }

  async removeMigration(id: string): Promise<void> {
    await this.client?.delete().from("migrations").where({ id });
  }

  async exec(cb: (params: any) => Promise<void>) {
    const isTransaction = this.client?.isTransaction ?? false;

    if (!isTransaction) {
      return this.client?.transaction(async (trx) => {
        try {
          await cb(trx);
          await trx.commit();
        } catch (err) {
          await trx.rollback();
          throw err;
        }
      });
    } else {
      return cb(this.client);
    }
  }

  createClient(connectionString: string) {
    return knex({
      client: "pg",
      connection: connectionString,
      searchPath: [this.schema || "public"],
    });
  }

  setClient(client: Knex<any, unknown[]>) {
    this.client = client;
  }

  async getEmptyMigrationContent(
    name: string,
    isInteractive?: boolean
  ): Promise<string> {
    return /*js*/ `
module.exports = {
  name: "{{name}}",
  up: async (db) => {
    // do your migration here
  },
  down: async (db) => {
    // undo your migration here
  },
};
`.replace("{{name}}", name);
  }
}

export { SqlDriver as Driver };
