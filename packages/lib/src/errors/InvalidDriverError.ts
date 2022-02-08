export class InvalidDriverError extends Error {
  public static MESSAGE = "Invalid driver: ";
  constructor(driver: string) {
    super(InvalidDriverError.MESSAGE + driver);
  }
}
