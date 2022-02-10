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
module.exports = {
  // @name: ${name}    
  up: async (params) => {
    // do your migration here
  },
  down: async (oarams) => {
    // undo your migration here
  },
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
