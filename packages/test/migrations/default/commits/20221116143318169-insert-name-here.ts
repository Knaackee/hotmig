import { Knex } from "knex";

// @name: insert name here
export = {
  up: async (db: Knex) => {
    // do your migration here
    await db.schema.createTable("test", (table) => {
      table.increments("id").primary();
      table.string("name");
    });
  },
  down: async (db: Knex) => {
    // undo your migration here
    await db.schema.dropTable("test");
  },
};
