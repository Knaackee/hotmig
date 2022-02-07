import { Driver } from "@hotmig/sql-driver";
import { Knex, knex } from "knex";

class PostgresDriver extends Driver {
  client: Knex<any, unknown[]> | undefined;

  constructor() {
    super();
  }

  async getDefaultConfig(isInteractive?: boolean): Promise<Knex.Config<any>> {
    return {
      client: "pg",
      connection: "postgresql://postgres:postgres@localhost:5432/db",
      searchPath: ["testing"],
    };
  }

  createClient(config: Knex.Config<any>) {
    return knex(config);
  }
}

export { PostgresDriver as Driver };
