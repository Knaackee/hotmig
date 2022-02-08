export class PendingMigrationsError extends Error {
  public static MESSAGE = "there are pending migrations, cant test";
  constructor() {
    super(PendingMigrationsError.MESSAGE);
  }
}
