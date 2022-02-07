module.exports = {
  name: "dreieieie",
  up: async (db) => {
    // do your migration here
    console.log("running up ", "dereieie");
    return db.schema.createTable("users3", (table) => {
      table.string("id").primary();
      table.string("name");
    });
  },
  down: async (db) => {
    // undo your migration here
    console.log("running down ", "dereieie");
    return db.schema.dropTable("users3");
  },
};
