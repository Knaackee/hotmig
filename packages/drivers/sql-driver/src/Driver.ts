import { Driver as Base, Migration } from "@hotmig/lib";
import { Knex, knex } from "knex";

export abstract class Driver extends Base<Knex.Config<any>> {
  client: Knex<any, unknown[]> | undefined;

  constructor() {
    super();
  }

  abstract createClient(config: Knex.Config<any>): Knex<any, unknown[]>;

  async init(config: Knex.Config<any>) {
    this.client = this.createClient(config);
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

  async removeMigration(id: string, params?: any): Promise<void> {
    let client = this.client;
    if (params) {
      client = params;
    }
    await client?.delete().from("migrations").where({ id });
  }

  async exec(cb: (params: any) => Promise<void>) {
    const isTransaction = this.client?.isTransaction ?? false;
    if (!isTransaction) {
      return this.client?.transaction(async (trx: any) => {
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

  setClient(client: Knex<any, unknown[]>) {
    this.client = client;
  }

  async getEmptyMigrationContent(
    name: string,
    isInteractive?: boolean
  ): Promise<string> {
    return /*js*/ `
import { Knex } from "knex";
import Chai from "chai";

// @name: ${name}    
export = {
  up: async (db:Knex) => {
    // do your migration here
  },
  down: async (db:Knex) => {
    // undo your migration here
  },
  testAfter: async (db: Knex, { expect }: Chai.ChaiStatic) => {
    // write your tests that run after up or before down here
    // return {
    //   "test1": async () => {
    //     expect(1).to.equal(1);
    //   },
    // }
  },
  testBefore: async (db: Knex, { expect }: Chai.ChaiStatic) => {
    // write your tests that run before up or after down here
    // return {
    //   "test1": async () => {
    //     expect(1).to.equal(1);
    //   },
    // }
  }
};
`.replace("{{name}}", name);
  }
}
