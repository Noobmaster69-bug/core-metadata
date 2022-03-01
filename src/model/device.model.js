const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const debug = require("../utils/debug")("model");
const property = sequelize.define("property", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  interval: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const command = sequelize.define("command", {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  host: {
    type: DataTypes.STRING,
    unique: "compositeIndex",
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING,
    unique: "compositeIndex",
    allowNull: false,
  },
  port: {
    type: DataTypes.INTEGER,
  },
  baudRate: {
    type: DataTypes.INTEGER,
    defaultValue: 9600,
  },
  parity: {
    type: DataTypes.STRING,
    defaultValue: "none",
  },
  stopBits: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  dataBits: {
    type: DataTypes.INTEGER,
    defaultValue: 8,
  },
});
const channels = sequelize.define("channels", {
  channel_name: {
    type: DataTypes.STRING,
    unique: true,
  },
  fc: {
    type: DataTypes.STRING,
  },
  addr: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});
property.command = property.hasOne(command, {
  foreignKey: { name: "propertyName", allowNull: false },
});
command.channels = command.hasMany(channels, {
  foreignKey: { name: "commandName", allowNull: false },
});
channels.belongsTo(command);
(async function () {
  try {
    await sequelize.sync();
    debug("All models were synchronized successfully.");
  } catch (err) {
    debug(err);
  }
})();
module.exports = { property, command, channels };
