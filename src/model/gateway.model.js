const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const debug = require("../utils/debug")("model");

const gatewayInfo = sequelize.define(
  "gatewayInfo",
  {
    property: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
(async function () {
  try {
    await sequelize.sync();
    debug("All models were synchronized successfully.");
  } catch (err) {
    require("child_process").spawn(
      /^win/.test(process.platform) ? "pm2.cmd" : "pm2",
      ["restart", "core-metadata"]
    );
    process.send("ready");
  }
})();
module.exports = { gatewayInfo };
