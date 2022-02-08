export class DevMigrationNotExistsError extends Error {
  public static MESSAGE = "dev.js does not exist";
  constructor() {
    super(DevMigrationNotExistsError.MESSAGE);
  }
}
