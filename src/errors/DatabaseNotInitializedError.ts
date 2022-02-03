export class DatabaseNotInitializedError extends Error {
  constructor() {
    super("Database is not initialized");
  }
}
