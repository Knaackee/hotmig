module.exports = {
  name: "zwei",
  up: async (db) => {
    // do your migration here
    console.log("running up ", "zwei");
    return db.schema.createTable("users2", (table) => {
      table.string("id").primary();
      table.string("name");
    });
  },
  down: async (db) => {
    // undo your migration here
    console.log("running down ", "zwei");
    return db.schema.dropTable("user2s2");
  },
};
