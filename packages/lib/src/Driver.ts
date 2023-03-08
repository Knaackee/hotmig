import { AppliedMigration, Migration } from "./models";

export abstract class Driver<TConfig = any> {
  abstract init(config: TConfig): Promise<void>;

  abstract createMigrationStore(): Promise<void>;

  abstract migrationStoreExists(): Promise<boolean>;

  abstract getAppliedMigrations(
    target: string
  ): Promise<Array<AppliedMigration>>;

  abstract addMigration(migration: Migration): Promise<void>;

  abstract removeMigration(id: string, params?: any): Promise<void>;

  abstract getDefaultConfig(isInteractive?: boolean): Promise<TConfig>;

  abstract exec(cb: (params: any) => Promise<void>): Promise<void>;

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

export class TestDriver extends Driver {
  config: any;
  _migrationsStoreExists: boolean = false;
  appliedMigrations: AppliedMigration[] = [];

  async init(config: any) {
    this.config = config;
  }
  async createMigrationStore() {
    this._migrationsStoreExists = true;
  }

  async migrationStoreExists() {
    return this._migrationsStoreExists;
  }
  async getAppliedMigrations(target: string) {
    return this.appliedMigrations;
  }
  async addMigration(migration: Migration) {
    this.appliedMigrations.push({
      id: migration.id ?? "",
      name: migration.name ?? "",
      createdAt: new Date(),
    });
  }
  async removeMigration(id: string, params?: any) {
    this.appliedMigrations = this.appliedMigrations.filter((m) => m.id !== id);
  }
  async getDefaultConfig(isInteractive?: boolean) {
    return {};
  }
  async exec(cb: (params: any) => Promise<void>) {
    await cb({});
  }
}
