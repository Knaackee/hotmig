process.env.NODE_ENV = "testing";

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { Knex } from "knex";
import { resolve } from "path";
import { OnProgressArgs, TestDriver } from ".";
import {
  DevMigrationAlreadyExistsError,
  DevMigrationInvalidError,
  DevMigrationNotExistsError,
  InvalidDriverError,
  NotInitializedError,
  PendingMigrationsError,
} from "./errors";
import { Target } from "./Target";
import "./utils";
import "./utils/testing";

const execa = require("execa");

let target: Target;

process.env.CONNECTION_STRING =
  "postgresql://postgres:postgres@localhost:5432/db?schema=testing";

const root = resolve(__dirname, "../test/test-env");

let i = 0;

let trx: any = undefined;
let _originalClient: any = undefined;

// jest.mock("fs");

// (utils as any).requireGlobal = jest.fn(async (packageName: string) => {
//   const fs = jest.requireActual("fs");
//   const { stdout: globalNodeModules } = await execa("npm root -g");
//   var packageDir = path.join(globalNodeModules, packageName);
//   if (!fs.existsSync(packageDir))
//     packageDir = path.join(globalNodeModules, "npm/node_modules", packageName); //find package required by old npm

//   if (!fs.existsSync(packageDir))
//     throw new Error("Cannot find global module '" + packageName + "'");

//   var packageMeta = JSON.parse(
//     fs.readFileSync(path.join(packageDir, "package.json")).toString()
//   );
//   if (!packageMeta.main) {
//     throw new Error(`package ${packageName} does not export a main file`);
//   }
//   var main = path.join(packageDir, packageMeta.main);

//   return eval(fs.readFileSync(main).toString());
// });

const clearTestEnv = () => {
  if (existsSync(root)) {
    rmSync(root, { recursive: true, force: true });
    mkdirSync(root);
  }
};

beforeAll(() => {
  clearTestEnv();
});

beforeEach(async () => {
  // vol.reset();

  target = new Target("default_" + i, root);
  await target.init("@hotmig/hotmig-driver-pg");
  await target.loadConfig();

  // start transaction
  const kn = (await (target.driver as any).client) as Knex<any, unknown[]>;
  trx = await kn.transaction();
  _originalClient = (target.driver as any).client;
  (target.driver as any).client = trx;

  await target.setDriver(new TestDriver());

  i++;
});

afterEach(async () => {
  clearTestEnv();
  // rollback
  await trx.rollback();
  await _originalClient.destroy();
});

describe("HotMig", () => {
  describe("isInitialized", () => {
    it("should return false if not already initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.isInitialized()).toBe(false);
    });
  });
  describe("init", () => {
    it("should initialize the migrations directory", async () => {
      expect(target.isInitialized()).toBe(true);
      expect(existsSync(target.baseDirectory)).toBe(true);
      expect(existsSync(target.commitDirectory)).toBe(true);
    });
    it("should create a target.config.js file", async () => {
      expect(target.configFilePath).toBe(
        resolve(target.baseDirectory, "default_" + (i - 1), "target.config.js")
      );
      expect(existsSync(target.configFilePath)).toBe(true);
    });
    it("should fail with invalid driver", async () => {
      // "uninitialize"
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.init("invalid-driver")).rejects.toThrow(
        InvalidDriverError.MESSAGE + "invalid-driver"
      );
    });
  });
  describe("loadConfig", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.loadConfig()).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should load config file", async () => {
      await target.loadConfig();
      expect(target.config).toMatchObject({
        driver: "@hotmig/hotmig-driver-pg",
      });
    });
  });
  describe("getLocalMigrations", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.getLocalMigrations()).rejects.toThrow(
        NotInitializedError.MESSAGE
      );
    });
    it("should work", async () => {
      expect(target.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 0,
      });
      await target.new("asd");
      await target.commit();
      expect(target.getLocalMigrations()).resolves.toMatchObject({
        loaded: 1,
        skipped: 0,
      });
    });
    it("should skip files with wrong file name", async () => {
      writeFileSync(resolve(target.commitDirectory, "alskdjf.sql"), "XXX");
      expect(target.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
    it("should skip files with wrong file extension", async () => {
      writeFileSync(
        resolve(target.commitDirectory, "202202040942461752-asd.txt"),
        "XXX"
      );
      expect(target.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
    it("should skip files with invalid content", async () => {
      writeFileSync(
        resolve(target.commitDirectory, "202202040942461752-asd.sql"),
        "XXX"
      );
      expect(target.getLocalMigrations()).resolves.toMatchObject({
        loaded: 0,
        skipped: 1,
      });
    });
  });
  describe("up", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.up()).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should work", async () => {
      await target.createMigrationStore();
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();

      const result = await target.up();
      expect(result.applied).toBe(1);
      const result2 = await target.up();
      expect(result2.applied).toBe(1);
      const result3 = await target.up();
      expect(result3.applied).toBe(0);
      let appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);

      // test with count (add 2 more)
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();
      await target.new("test3");
      await target.commit();
      const result4 = await target.up({ count: 2 });
      expect(result4.applied).toBe(2);
      appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(4);

      // check if order is correct
      expect(parseInt(result4.migrations[0].id ?? "")).toBeLessThan(
        parseInt(result4.migrations[1].id ?? "")
      );

      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();

      const progresses = new Array<OnProgressArgs>();

      await target.down({
        count: 2,
        onProgress: async (args) => {
          console.log(args);
          progresses.push(args);
        },
      });

      console.log(progresses);
      expect(progresses).toHaveLength(4);
      expect(progresses[0]).toMatchObject({ total: 2, applied: 0 });
      expect(progresses[1]).toMatchObject({ total: 2, applied: 1 });
      expect(progresses[2]).toMatchObject({ total: 2, applied: 2 });
      expect(progresses[3]).toMatchObject({ total: 2, applied: 2 });
    });
  });
  describe("down", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.down()).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should work", async () => {
      await target.createMigrationStore();
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();

      const result = await target.up();
      const result2 = await target.up();
      const result3 = await target.down();
      expect(result.applied).toBe(1);
      expect(result2.applied).toBe(1);
      expect(result3.applied).toBe(1);
      let appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(1);

      // test with count (add 2 more)
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();
      const result4 = await target.up({ count: 2 });
      expect(result4.applied).toBe(2);
      appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(3);
      const result5 = await target.down({ count: 2 });
      appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(1);

      // check if order is correct
      expect(parseInt(result5.migrations[0].id ?? "")).toBeGreaterThan(
        parseInt(result5.migrations[1].id ?? "")
      );

      // test if progress gets reported
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();

      const progresses = new Array<OnProgressArgs>();

      await target.up({
        count: 2,
        onProgress: async (args) => {
          console.log(args);
          progresses.push(args);
        },
      });

      console.log(progresses);
      expect(progresses).toHaveLength(4);
      expect(progresses[0]).toMatchObject({ total: 2, applied: 0 });
      expect(progresses[1]).toMatchObject({ total: 2, applied: 1 });
      expect(progresses[2]).toMatchObject({ total: 2, applied: 2 });
      expect(progresses[3]).toMatchObject({ total: 2, applied: 2 });
    });
  });
  describe("latest", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.latest()).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should work", async () => {
      await target.createMigrationStore();
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();
      const result = await target.latest();
      expect(result.applied).toBe(2);
      const appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);
    });
  });
  describe("reset", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.reset()).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should work", async () => {
      await target.createMigrationStore();
      await target.new("test");
      await target.commit();
      await target.new("test2");
      await target.commit();
      const result = await target.latest();
      expect(result.applied).toBe(2);
      let appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(2);

      const result2 = await target.reset();
      expect(result2.applied).toBe(2);
      appliedMigrations = await target.getAppliedMigrations();
      expect(appliedMigrations).toHaveLength(0);
    });
  });
  describe("new", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.new("")).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should fail if a dev.js already exists", async () => {
      await target.new("init");
      expect(target.new("init")).rejects.toThrow(
        DevMigrationAlreadyExistsError.MESSAGE
      );
    });
    it("should work", async () => {
      await target.new("init");
      expect(existsSync(target.devJsPath)).toBe(true);
      expect(readFileSync(target.devJsPath).toString()).toContain("init");
    });
  });
  describe("commit", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.new("")).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should fail if a dev.sql does not exists", async () => {
      expect(target.commit()).rejects.toThrow(
        DevMigrationNotExistsError.MESSAGE
      );
    });
    it("should fail if a dev.sql is not valid", async () => {
      writeFileSync(target.devJsPath, "XXX");
      expect(target.commit()).rejects.toThrow(DevMigrationInvalidError.MESSAGE);
    });
    it("should work", async () => {
      await target.new("init");
      const commit = await target.commit();
      expect(existsSync(commit.filePath || "")).toBe(true);
      expect(readFileSync(commit.filePath || "").toString()).toContain("init");
      expect(existsSync(target.devJsPath)).toBe(false);
    });
  });
  describe("pending", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.pending()).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should work", async () => {
      await target.createMigrationStore();
      await target.new("asd");
      await target.commit();
      expect(target.pending()).resolves.toHaveLength(1);
    });
  });
  describe("test", () => {
    it("should fail if not initialized", async () => {
      rmSync(target.targetDirectory, { recursive: true, force: true });
      expect(target.new("")).rejects.toThrow(NotInitializedError.MESSAGE);
    });
    it("should fail if a dev.js does not exists", async () => {
      expect(target.test()).rejects.toThrow(DevMigrationNotExistsError.MESSAGE);
    });
    it("should fail if a dev.js is not valid", async () => {
      await target.new("init");
      writeFileSync(target.devJsPath, "XXX");
      await expect(target.test()).rejects.toThrow("dev.js is invalid");
    });
    it("should fail if there are pending migrations", async () => {
      await target.createMigrationStore();
      await target.new("init");
      await target.commit();
      await target.new("init");
      expect(target.test()).rejects.toThrow(PendingMigrationsError.MESSAGE);
    });
    it("should work", async () => {
      await target.createMigrationStore();
      await target.new("init");
      await expect(target.test()).resolves.toBeUndefined();
    });
  });
});
