const { Sequelize } = require("sequelize");
const debug = require("../utils/debug")("postgreSQL");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: (msg) => debug(msg),
  logging: false,
});
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
