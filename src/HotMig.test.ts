import { existsSync, mkdirSync, rmSync } from "fs";
import { resolve } from "path";
import { HotMig } from "./HotMig";
import { PostgresDatabase } from "./PostgresDatabase";
import "./utils";
import { isValidMigrationContent } from "./utils";

let hm: HotMig;
const root = resolve(__dirname, "../test-env");

beforeEach(async () => {
  hm = new HotMig(new PostgresDatabase(process.env.CONNECTION_STRING), root);
});

afterEach(async () => {
  if (existsSync(root)) {
    rmSync(root, { recursive: true, force: true });
    mkdirSync(root);
  }
});

describe("HotMig", () => {
  it("should return false if not already initialized", async () => {
    expect(hm.isInitialized()).toBe(false);
  });
  it("createMigration should fail if not initialized", async () => {
    expect(hm.createMigration("")).rejects.toThrow("not initialized");
  });
  it("init without Database should fail", async () => {
    expect(() => new HotMig(undefined, root)).toThrow("db is required");
  });
  it("should return true if initialized", async () => {
    await hm.init();
    expect(hm.isInitialized()).toBe(true);
  });
  it("createMigration should work", async () => {
    await hm.init();
    const migration = await hm.createMigration(TEST_MIGRATION_CONTENT);
    expect(migration.id).toBeDefined();
    expect(migration.name).toBeDefined();
    expect(migration.upSql).toBeDefined();
    expect(migration.downSql).toBeDefined();
    expect(migration.filePath).toBeDefined();
    console.log(migration);
  });

  /*
  - leere migration (up oder down sql) ablehnen
  - load local migrations
  - migrations..... (up, down, latest)
  */

  it("createMigration should fail without content", async () => {
    await hm.init();
    expect(hm.createMigration(undefined)).rejects.toThrow(
      "migration content is required"
    );
    expect(hm.createMigration("")).rejects.toThrow(
      "migration content is required"
    );
    expect(hm.createMigration("XXX")).rejects.toThrow(
      "migration content is invalid"
    );
  });
});

const TEST_MIGRATION_CONTENT = `--------------------------------
-- Migration: init
--------------------------------

-- UP

-- DOWN
`;
