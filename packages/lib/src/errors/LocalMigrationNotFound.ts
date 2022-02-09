export class LocalMigrationNotFound extends Error {
  public static MESSAGE = "local migration not found: ";
  constructor(filePath: string) {
    super(LocalMigrationNotFound.MESSAGE + filePath);
  }
}
