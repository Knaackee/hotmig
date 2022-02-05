import invariant from "invariant";
import { Knex, knex } from "knex";
import { Pool, PoolClient } from "pg";

jest.setTimeout(10000);

export class TestDb {
  public client: Knex<any, unknown[]> | undefined;

  constructor() {
    invariant(
      process.env.CONNECTION_STRING,
      "process.env.CONNECTION_STRING is required"
    );
    this.client = knex({
      client: "pg",
      connection: process.env.CONNECTION_STRING,
      // searchPath: ["testing"],
    });
  }

  async init() {
    await this.client?.raw("BEGIN;");
    await this.client?.raw(`CREATE SCHEMA IF NOT EXISTS "testing";`);
    await this.client?.raw(`SET search_path to "testing";`);
  }

  async end() {
    await this.client?.raw("ROLLBACK;");
    await this.client?.destroy();
  }
}
