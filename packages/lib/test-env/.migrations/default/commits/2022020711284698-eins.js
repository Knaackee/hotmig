module.exports = {
  name: "eins",
  up: async (db) => {
    // do your migration here
    console.log("running up", "eins");
    return db.schema.createTable("users", (table) => {
      table.string("id").primary();
      table.string("name");
    });
  },
  down: async (db) => {
    // undo your migration here
    console.log("running down", "eins");
    return db.schema.dropTable("users");
  },
};
