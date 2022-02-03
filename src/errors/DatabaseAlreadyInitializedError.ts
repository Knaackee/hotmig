export class DatabaseAlreadyInitializedError extends Error {
  constructor() {
    super("Database is already initialized");
  }
}
