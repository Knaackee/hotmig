import { isValidMigrationContent } from ".";

describe("utils", () => {
  describe("isValidMigrationContent", () => {
    it("should work", () => {
      expect(() => isValidMigrationContent("-- Migration:")).toBeTruthy();
    });
  });
});
