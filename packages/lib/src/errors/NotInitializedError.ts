export class NotInitializedError extends Error {
  public static MESSAGE = "HotMig is not initialized";
  constructor() {
    super(NotInitializedError.MESSAGE);
  }
}
