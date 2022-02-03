import { PostgresDatabase } from "./PostgresDatabase";
import { TestDb } from "./utils";

let db: TestDb | undefined;

beforeAll(async () => {
  db = new TestDb();
  await db.init();
});

afterAll(async () => {
  await db?.end();
});

describe("PostgresDatabase", () => {
  describe("init", () => {
    it("should init the database with connection string", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      await p.init();
      expect(p.isInitialized()).toBe(true);
      await p.dispose();
    });
    it("Postgresql should init the database with a client", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      await p.setClient(db?.client);
      expect(p.isInitialized()).toBe(true);
    });
    it("should fail if connection string does not contain a schema", async () => {
      expect(() => new PostgresDatabase("postgresql://...")).toThrow(
        `"schema" is missing in connection string`
      );
    });
    it("should fail if already initalized", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      await p.setClient(db?.client);
      expect(p.isInitialized()).toBe(true);
      expect(p.init()).rejects.toThrow("Database is already initialized");
    });
  });
  describe("dispose", () => {
    it("should dispose the database", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      await p.init();
      await p.dispose();
      expect(p.isInitialized()).toBe(false);
    });
    it("should fail if not initialized", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      expect(p.dispose()).rejects.toThrow("Database is not initialized");
    });
  });
  describe("migrationsTableExists", () => {
    it("should return false if the migrations table exists", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      await p.setClient(db?.client);
      await expect(p.migrationsTableExists()).resolves.toBe(false);
    });
    it("should return true if the migrations table exists", async () => {
      const p = new PostgresDatabase(process.env.CONNECTION_STRING);
      await p.setClient(db?.client);
      await expect(p.migrationsTableExists()).resolves.toBe(false);
      await p.createMigrationsTable();
      await expect(p.migrationsTableExists()).resolves.toBe(true);
    });
  });
});
