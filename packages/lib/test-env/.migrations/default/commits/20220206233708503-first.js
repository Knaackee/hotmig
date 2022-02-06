module.exports = {
  name: "first",
  up: (db) => {
    // do your migration here
    return db.schema.createTable("users", function (table) {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  },
  down: (db) => {
    // undo your migration here
    return db.schema.dropTable("users");
  },
};
