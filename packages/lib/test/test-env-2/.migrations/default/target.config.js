module.exports = {
  driver: "@hotmig/hotmig-driver-pg",
  config: {
    client: "pg",
    connection: "postgresql://postgres:postgres@localhost:5432/db",
    searchPath: ["testing"],
  },
};
