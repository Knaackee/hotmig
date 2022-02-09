import { DevMigrationInvalidError } from "./DevMigrationInvalidError";

export class InvalidConfigError extends Error {
  public static MESSAGE = "Invalid config: ";
  constructor(reason: string) {
    super(DevMigrationInvalidError.MESSAGE + reason);
  }
}
