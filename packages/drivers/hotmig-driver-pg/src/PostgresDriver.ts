import { Driver } from "@hotmig/sql-driver";
import { Knex, knex } from "knex";
import chalk from "chalk";

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
      asyncStackTraces: true,
    };
  }

  createClient(config: Knex.Config<any>) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    if (process.env.DATABASE_CONNECTION) {
      console.log(
        chalk.yellow("Using DATABASE_CONNECTION environment variable.")
      );

      const parse = require("pg-connection-string").parse;
      const pgconfig = parse(process.env.DATABASE_CONNECTION);
      pgconfig.ssl = { rejectUnauthorized: false };

      return knex({
        client: "pg",
        connection: pgconfig,
      });
    }

    return knex(config);
  }
}

export { PostgresDriver as Driver };
