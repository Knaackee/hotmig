export class AlreadyInitializedError extends Error {
  public static MESSAGE = "HotMig is already initialized";
  constructor() {
    super(AlreadyInitializedError.MESSAGE);
  }
}
