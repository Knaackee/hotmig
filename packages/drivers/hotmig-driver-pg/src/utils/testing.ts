import invariant from "invariant";
import { Pool, PoolClient } from "pg";

jest.setTimeout(10000);

process.env.CONNECTION_STRING =
  "postgresql://postgres:postgres@localhost:5432/db?schema=testing";

export class TestDb {
  readonly pool: Pool;
  public client: PoolClient | undefined;

  constructor() {
    invariant(
      process.env.CONNECTION_STRING,
      "process.env.CONNECTION_STRING is required"
    );
    this.pool = new Pool({
      connectionString: process.env.CONNECTION_STRING,
    });
  }

  async init() {
    this.client = await this.pool.connect();
    await this.client?.query("BEGIN;");
    await this.client?.query(`CREATE SCHEMA IF NOT EXISTS "testing";`);
    await this.client?.query(`SET search_path to "testing";`);
  }

  async end() {
    await this.client?.query("ROLLBACK;");
    await this.client?.release();
    await this.pool.end();
  }
}
