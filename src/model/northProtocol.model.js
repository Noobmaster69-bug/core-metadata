const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { models } = require("./model.model");
const northProtocols = sequelize.define("northProtocols", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
  },
});
const mqtts = sequelize.define("mqtts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  northProtocolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  host: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1883,
  },
  protocol: {
    type: DataTypes.ENUM,
    values: ["mqtt", "mqtts", "tcp", "tls", "ws", "wss", "wxs", "alis"],
    defaultValue: "mqtt",
  },
  wsOption: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
  keepalive: {
    type: DataTypes.INTEGER,
    defaultValue: 60,
  },
  reschedulePings: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reconnectPeriod: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
  },
  connectTimeout: {
    type: DataTypes.INTEGER,
    defaultValue: 30000,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  queueQoZero: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  QoS: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});
module.exports = {
  northProtocols,
  mqtts,
};
