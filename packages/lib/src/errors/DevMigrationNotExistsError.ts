export class DevMigrationNotExistsError extends Error {
  public static MESSAGE = "dev.ts does not exist";
  constructor() {
    super(DevMigrationNotExistsError.MESSAGE);
  }
}
