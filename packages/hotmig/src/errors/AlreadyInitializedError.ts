export class AlreadyInitializedError extends Error {
  constructor() {
    super("HotMig is already initialized");
  }
}
