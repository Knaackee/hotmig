export class DevMigrationAlreadyExistsError extends Error {
  public static MESSAGE = "dev.ts already exists";
  constructor() {
    super(DevMigrationAlreadyExistsError.MESSAGE);
  }
}
