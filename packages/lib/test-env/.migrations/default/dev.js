module.exports = {
  name: "second",
  up: (db) => {
    // do your migration here
    return db.schema.createTable("users2", function (table) {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  },
  down: (db) => {
    // undo your migration here
    return db.schema.dropTable("users2");
  },
};
