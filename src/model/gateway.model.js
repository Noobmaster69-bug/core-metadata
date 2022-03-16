const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
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

module.exports = { gatewayInfo };
