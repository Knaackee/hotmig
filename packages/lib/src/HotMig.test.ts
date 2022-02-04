import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { resolve } from "path";
import { HotMig } from "./HotMig";
import "./utils";
import { requireGlobal } from "./utils";
import { TestDb } from "./utils/testing";
import { Database as PostgresDatabase } from "@hotmig/hotmig-driver-pg";

let hm: HotMig;
let db: PostgresDatabase;
let testDb: TestDb;

const root = resolve(__dirname, "../test-env");

beforeEach(async () => {
  db = new PostgresDatabase(process.env.CONNECTION_STRING);

  testDb = new TestDb();
  await testDb.init();

  db.setClient(testDb.client);

  hm = new HotMig(root);
  hm.setDatabase(db as any);
});

afterEach(async () => {
  if (existsSync(root)) {
    rmSync(root, { recursive: true, force: true });
    mkdirSync(root);
  }
  await testDb.end();
});

describe("HotMig", () => {
  describe("isInitialized", () => {
    it("should return false if not already initialized", async () => {
      expect(hm.isInitialized()).toBe(false);
    });
  });
  describe("init", () => {
    it("should initialize the migrations directory", async () => {
      await hm.init({ driver: "x" });
      expect(hm.isInitialized()).toBe(true);
      expect(existsSync(hm.baseDirectory)).toBe(true);
      expect(existsSync(hm.commitDirectory)).toBe(true);
    });
    it("should create a hotmig.config.js file", async () => {
      await hm.init({ driver: "x" });
      expect(existsSync(hm.configFilePath)).toBe(true);
    });
  });
  describe("loadConfig", () => {
    it("should fail if not initialized", async () => {
      expect(hm.loadConfig()).rejects.toThrow("not initialized");
    });
    it("should load config file", async () => {
      await hm.init({ driver: "@hotmig/hotmig-driver-pg" });
      await hm.loadConfig();
      expect(hm.config).toMatchObject({ driver: "@hotmig/hotmig-driver-pg" });
    });
  });
  describe("createLocalMigration", () => {
    it("should fail if not initialized", async () => {
      expect(hm.createLocalMigration("")).rejects.toThrow("not initialized");
    });
    it("should fail without migration", async () => {
      await hm.init({ driver: "x" });
      expect(hm.createLocalMigration(undefined)).rejects.toThrow(
        "migration content is required"
      );
    });
    it("should fail without name", async () => {
      await hm.init({ driver: "x" });
      expect(
        hm.createLocalMigration(TEST_MIGRATION_CONTENT_WITHOUT_NAME)
      ).rejects.toThrow("migration name is empty");
    });
    it("should work", async () => {
      await hm.init({ driver: "x" });
      const migration = await hm.createLocalMigration(
        TEST_MIGRATION_CONTENT(1)
      );
      expect(migration.id).toBeDefined();
      expect(migration.name).toBeDefined();
      expect(migration.upSql).toBeDefined();
      expect(migration.downSql).toBeDefined();
      expect(migration.filePath).toBeDefined();
      expect(existsSync(migration.filePath || "")).toBe(true);
    });
    it("allowEmpty should allow empty migrations", async () => {
      await hm.init({ driver: "x" });
      const migration = await hm.createLocalMigration(
        TEST_MIGRATION_CONTENT_EMPTY,
        {
          allowEmpty: true,
        }
      );
      expect(migration.id).toBeDefined();
      expect(migration.name).toBeDefined();
      expect(migration.upSql).toBeDefined();
      expect(migration.downSql).toBeDefined();
      expect(migration.filePath).toBeDefined();
      expect(existsSync(migration.filePath || "")).toBe(true);
    });
    it("createMigration should fail without content", async () => {
      await hm.init({ driver: "x" });
      expect(hm.createLocalMigration(undefined)).rejects.toThrow(
        "migration content is required"
      );
      expect(hm.createLocalMigration("")).rejects.toThrow(
        "migration content is required"
      );
      expect(hm.createLocalMigration("XXX")).rejects.toThrow(
        "migration content is invalid"
      );
    });
  });
  describe("getLocalMigrations", () => {
    it("should work", async () => {
      await hm.init({ driver: "x" });
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 0,
      });
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(1));
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 1,
        skipped: 0,
      });
    });
    it("should skip files with wrong file name", async () => {
      await hm.init({ driver: "x" });
      writeFileSync(resolve(hm.commitDirectory, "alskdjf.sql"), "XXX");
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });

    it("should skip files with wrong file extension", async () => {
      await hm.init({ driver: "x" });
      writeFileSync(
        resolve(hm.commitDirectory, "202202040942461752-asd.txt"),
        "XXX"
      );
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
    it("should skip files with invalid content", async () => {
      await hm.init({ driver: "x" });
      writeFileSync(
        resolve(hm.commitDirectory, "202202040942461752-asd.sql"),
        "XXX"
      );
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
    // 100% coverage
    // monorepo
    // cli
    // vs code extension
  });
  describe("up", () => {
    it("should fail if not initialized", async () => {
      expect(hm.up()).rejects.toThrow("not initialized");
    });
    it("should fail without Database", async () => {
      await hm.init({ driver: "x" });
      hm.setDatabase(undefined as any);
      expect(hm.up()).rejects.toThrow("db is required");
    });
    it("should work", async () => {
      await hm.init({ driver: "x" });
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(1));
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(2));

      await db.createMigrationsTable();
      const result = await hm.up();
      expect(result.applied).toBe(1);

      const result2 = await hm.up();
      expect(result2.applied).toBe(1);

      const result3 = await hm.up();
      expect(result3.applied).toBe(0);

      const appliedMigrations = await db.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);
    });
  });
  describe("down", () => {
    it("should fail if not initialized", async () => {
      expect(hm.down()).rejects.toThrow("not initialized");
    });

    it("should work", async () => {
      await hm.init({ driver: "x" });
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(1));
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(2));

      await db.createMigrationsTable();
      const result = await hm.up();
      const result2 = await hm.up();
      const result3 = await hm.down();

      expect(result.applied).toBe(1);
      expect(result2.applied).toBe(1);
      expect(result3.applied).toBe(1);

      const appliedMigrations = await db.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(1);
    });
  });
  describe("latest", () => {
    it("should fail if not initialized", async () => {
      expect(hm.latest()).rejects.toThrow("not initialized");
    });

    it("should work", async () => {
      await hm.init({ driver: "x" });
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(1));
      await hm.createLocalMigration(TEST_MIGRATION_CONTENT(2));

      await db.createMigrationsTable();
      const result = await hm.latest();
      expect(result.applied).toBe(2);

      const appliedMigrations = await db.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);
    });
  });
});

const TEST_MIGRATION_CONTENT = (id: number) => `--------------------------------
-- Migration: init-test
--------------------------------

-- UP
create table test_${id} (id serial); 
-- DOWN 
drop table test_${id};    
`;

const TEST_MIGRATION_CONTENT_EMPTY = `--------------------------------
-- Migration: init
--------------------------------

-- UP

-- DOWN

`;

const TEST_MIGRATION_CONTENT_WITHOUT_NAME = `--------------------------------
-- Migration: 
--------------------------------

-- UP
create table test (id int serial);
-- DOWN
drop table test;
`;