import { isValidMigrationContent } from "./utils";

describe("utils", () => {
  describe("isValidMigrationContent", () => {
    it("should work", () => {
      expect(() => isValidMigrationContent("-- Migration:")).toBeTruthy();
    });
  });
});
