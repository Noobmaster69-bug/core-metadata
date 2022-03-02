const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const debug = require("../utils/debug")("model");
const gateway = sequelize.define(
  "gateway",
  {
    gatewayId: {
      type: DataTypes.UUIDV4,
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
    debug(err);
  }
})();
module.exports = { gateway };
