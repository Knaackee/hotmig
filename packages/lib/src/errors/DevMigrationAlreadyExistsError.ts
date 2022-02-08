export class DevMigrationAlreadyExistsError extends Error {
  public static MESSAGE = "dev.js already exists";
  constructor() {
    super(DevMigrationAlreadyExistsError.MESSAGE);
  }
}
