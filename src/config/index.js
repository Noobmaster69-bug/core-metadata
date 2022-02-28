const { database } = require("pg/lib/defaults");
const debug = require("../utils/debug")("config");
module.exports = async function () {
  require("dotenv").config();
};
