export class NotInitializedError extends Error {
  constructor() {
    super("HotMig is not initialized");
  }
}
