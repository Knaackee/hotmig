export class DevMigrationInvalidError extends Error {
  public static MESSAGE = "dev.ts is invalid";
  constructor() {
    super(DevMigrationInvalidError.MESSAGE);
  }
}
