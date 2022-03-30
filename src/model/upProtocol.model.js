const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const mqtts = sequelize.define(
  "mqtts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.STRING,
      defaultValue: "{}",
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
    qos: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: false,
    },
    deviceId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = {
  mqtts,
};
