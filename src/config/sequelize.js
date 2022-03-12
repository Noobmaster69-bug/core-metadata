const { Sequelize } = require("sequelize");
const debug = require("../utils/debug")("postgreSQL");
const { spawn } = require("child_process");
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
      debug("Restarting server");
      spawn(/^win/.test(process.platform) ? "pm2.cmd" : "pm2", [
        "restart",
        "core-metadata",
      ]);
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
    logging: (msg) => debug(msg),
    // logging: false,
  }
);
module.exports = sequelize;
