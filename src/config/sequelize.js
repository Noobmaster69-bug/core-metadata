const { Sequelize } = require("sequelize");
const debug = require("../utils/debug")("postgreSQL");
(async () => {
  const { Client } = require("pg");
  const client = new Client({
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "ptn209b3",
  });
  await client.connect();
  try {
    debug("Checking database");
    const isExist = (
      await client.query(
        "SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('CORE');"
      )
    ).rowCount;
    if (isExist === 0) {
      debug("Missing database, creating one");
      await client.query("CREATE DATABASE CORE");
      debug("Created CORE database");
    }
  } catch (err) {
    debug(err);
  }
  await client.end();

  return;
})();
const sequelize = new Sequelize(
  "postgres://postgres:ptn209b3@127.0.0.1:5432/core",
  {
    // logging: (msg) => debug(msg),
    logging: false,
  }
);
async function checkForConnection() {
  try {
    await sequelize.authenticate();
    debug("Connection has been established successfully.");
  } catch (error) {
    checkForConnection();
  }
}
checkForConnection();
module.exports = sequelize;
