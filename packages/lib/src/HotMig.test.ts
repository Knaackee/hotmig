import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { Knex } from "knex";
import { resolve } from "path";
import { HotMig } from "./HotMig";
import "./utils";
import "./utils/testing";

let hm: HotMig;

process.env.CONNECTION_STRING =
  "postgresql://postgres:postgres@localhost:5432/db?schema=testing";

const root = resolve(__dirname, "../test-env");

let i = 0;

let trx: any = undefined;
let _originalClient: any = undefined;

beforeEach(async () => {
  hm = new HotMig("default_" + i, root);
  await hm.init("@hotmig/hotmig-driver-pg");
  await hm.loadConfig();

  // start transaction
  const kn = (await (hm.driver as any).client) as Knex<any, unknown[]>;
  trx = await kn.transaction();
  _originalClient = (hm.driver as any).client;
  (hm.driver as any).client = trx;

  i++;
});

afterEach(async () => {
  if (existsSync(root)) {
    rmSync(root, { recursive: true, force: true });
    mkdirSync(root);

    // rollback
    await trx.rollback();
    await _originalClient.destroy();
  }
});

describe("HotMig", () => {
  describe("isInitialized", () => {
    it("should return false if not already initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.isInitialized()).toBe(false);
    });
  });
  describe("init", () => {
    it("should initialize the migrations directory", async () => {
      expect(hm.isInitialized()).toBe(true);
      expect(existsSync(hm.baseDirectory)).toBe(true);
      expect(existsSync(hm.commitDirectory)).toBe(true);
    });
    it("should create a hotmig.config.js file", async () => {
      expect(hm.configFilePath).toBe(
        resolve(hm.baseDirectory, "default_" + (i - 1), "hotmig.config.js")
      );
      expect(existsSync(hm.configFilePath)).toBe(true);
    });
  });
  describe("loadConfig", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.loadConfig()).rejects.toThrow("not initialized");
    });
    it("should load config file", async () => {
      await hm.loadConfig();
      expect(hm.config).toMatchObject({ driver: "@hotmig/hotmig-driver-pg" });
    });
  });
  describe("getLocalMigrations", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.getLocalMigrations()).rejects.toThrow("not initialized");
    });
    it("should work", async () => {
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 0,
      });
      await hm.new("asd");
      await hm.commit();
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 1,
        skipped: 0,
      });
    });
    it("should skip files with wrong file name", async () => {
      writeFileSync(resolve(hm.commitDirectory, "alskdjf.sql"), "XXX");
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
    it("should skip files with wrong file extension", async () => {
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
      writeFileSync(
        resolve(hm.commitDirectory, "202202040942461752-asd.sql"),
        "XXX"
      );
      expect(hm.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
  });
  describe("up", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.up()).rejects.toThrow("not initialized");
    });
    it("should fail without Database", async () => {
      delete hm.driver;
      expect(hm.up()).rejects.toThrow("db is required");
    });
    it("should work", async () => {
      await hm.createMigrationStore();
      await hm.new("test");
      await hm.commit();
      await hm.new("test2");
      await hm.commit();

      const result = await hm.up();
      expect(result.applied).toBe(1);
      const result2 = await hm.up();
      expect(result2.applied).toBe(1);
      const result3 = await hm.up();
      expect(result3.applied).toBe(0);
      let appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);

      // test with count (add 2 more)
      await hm.new("test");
      await hm.commit();
      await hm.new("test2");
      await hm.commit();
      await hm.new("test3");
      await hm.commit();
      const result4 = await hm.up({ count: 2 });
      expect(result4.applied).toBe(2);
      appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(4);

      // check if order is correct
      expect(parseInt(result4.migrations[0].id ?? "")).toBeLessThan(
        parseInt(result4.migrations[1].id ?? "")
      );
    });
  });
  describe("down", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.down()).rejects.toThrow("not initialized");
    });
    it("should work", async () => {
      await hm.createMigrationStore();
      await hm.new("test");
      await hm.commit();
      await hm.new("test2");
      await hm.commit();

      const result = await hm.up();
      const result2 = await hm.up();
      const result3 = await hm.down();
      expect(result.applied).toBe(1);
      expect(result2.applied).toBe(1);
      expect(result3.applied).toBe(1);
      let appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(1);

      // test with count (add 2 more)
      await hm.new("test");
      await hm.commit();
      await hm.new("test2");
      await hm.commit();
      const result4 = await hm.up({ count: 2 });
      expect(result4.applied).toBe(2);
      appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(3);
      const result5 = await hm.down({ count: 2 });
      appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(1);

      // check if order is correct
      expect(parseInt(result5.migrations[0].id ?? "")).toBeGreaterThan(
        parseInt(result5.migrations[1].id ?? "")
      );
    });
  });
  describe("latest", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.latest()).rejects.toThrow("not initialized");
    });
    it("should work", async () => {
      await hm.createMigrationStore();
      await hm.new("test");
      await hm.commit();
      await hm.new("test2");
      await hm.commit();
      const result = await hm.latest();
      expect(result.applied).toBe(2);
      const appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);
    });
  });
  describe("reset", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.reset()).rejects.toThrow("not initialized");
    });
    it("should work", async () => {
      await hm.createMigrationStore();
      await hm.new("test");
      await hm.commit();
      await hm.new("test2");
      await hm.commit();
      const result = await hm.latest();
      expect(result.applied).toBe(2);
      let appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);

      const result2 = await hm.reset();
      expect(result2.applied).toBe(2);
      appliedMigrations = await hm.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(0);
    });
  });
  describe("new", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.new("")).rejects.toThrow("not initialized");
    });
    it("should fail if a dev.js already exists", async () => {
      await hm.new("init");
      expect(hm.new("init")).rejects.toThrow("dev.js already exists");
    });
    it("should work", async () => {
      await hm.new("init");
      expect(existsSync(hm.devJsPath)).toBe(true);
      expect(readFileSync(hm.devJsPath).toString()).toContain("init");
    });
  });
  describe("commit", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.new("")).rejects.toThrow("not initialized");
    });
    it("should fail if a dev.sql does not exists", async () => {
      expect(hm.commit()).rejects.toThrow("dev.js does not exist");
    });
    it("should fail if a dev.sql is not valid", async () => {
      writeFileSync(hm.devJsPath, "XXX");
      expect(hm.commit()).rejects.toThrow("dev.js is invalid");
    });
    it("should work", async () => {
      await hm.new("init");
      const commit = await hm.commit();
      expect(existsSync(commit.filePath || "")).toBe(true);
      expect(readFileSync(commit.filePath || "").toString()).toContain("init");
      expect(existsSync(hm.devJsPath)).toBe(false);
    });
  });
  describe("pending", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.pending()).rejects.toThrow("not initialized");
    });
    it("should work", async () => {
      await hm.createMigrationStore();
      await hm.new("asd");
      await hm.commit();
      expect(hm.pending()).resolves.toHaveLength(1);
    });
  });
  describe("test", () => {
    it("should fail if not initialized", async () => {
      rmSync(hm.targetDirectory, { recursive: true, force: true });
      expect(hm.new("")).rejects.toThrow("not initialized");
    });
    it("should fail if a dev.js does not exists", async () => {
      expect(hm.test()).rejects.toThrow("dev.js does not exist");
    });
    it("should fail if a dev.js is not valid", async () => {
      await hm.new("init");
      writeFileSync(hm.devJsPath, "XXX");
      await expect(hm.test()).rejects.toThrow("dev.js is invalid");
    });
    it("should fail if there are pending migrations", async () => {
      await hm.createMigrationStore();
      await hm.new("init");
      await hm.commit();
      await hm.new("init");
      expect(hm.test()).rejects.toThrow(
        "there are pending migrations, cant test"
      );
    });
    it("should work", async () => {
      await hm.createMigrationStore();
      await hm.new("init");
      await expect(hm.test()).resolves.toBeUndefined();
    });
  });
});
