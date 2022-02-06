import { AppliedMigration, Migration } from "./models";

export abstract class Driver<TConfig = any> {
  abstract init(config: any): Promise<void>;

  abstract createMigrationStore(): Promise<void>;

  abstract migrationStoreExists(): Promise<boolean>;

  abstract getAppliedMigrations(
    target: string
  ): Promise<Array<AppliedMigration>>;

  abstract addMigration(migration: Migration): Promise<void>;

  abstract removeMigration(id: string): Promise<void>;

  abstract getDefaultConfig(isInteractive?: boolean): Promise<TConfig>;

  // abstract up(migrations: Array<Migration>): Promise<void>;

  // abstract down(migrations: Array<Migration>): Promise<void>;

  // abstract test(migration: Migration): Promise<void>;
  abstract exec(cb: (params: any) => Promise<void>): Promise<void>;

  abstract getEmptyMigrationContent(
    name: string,
    isInteractive?: boolean
  ): Promise<string>;
}
