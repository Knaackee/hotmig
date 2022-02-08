export class DevMigrationInvalidError extends Error {
  public static MESSAGE = "dev.js is invalid";
  constructor() {
    super(DevMigrationInvalidError.MESSAGE);
  }
}
