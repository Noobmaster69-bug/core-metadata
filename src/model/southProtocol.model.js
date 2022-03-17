const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const modbusRTUs = sequelize.define(
  "modbusRTUs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      unique: "compositeIndex",
      allowNull: false,
    },
    unitId: {
      type: DataTypes.STRING,
      unique: "compositeIndex",
      allowNull: false,
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
    deviceId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

const modbusTCPs = sequelize.define(
  "modbusTCPs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    host: {
      type: DataTypes.STRING,
      unique: "compositeIndex",
      allowNull: false,
    },
    unitId: {
      type: DataTypes.STRING,
      unique: "compositeIndex",
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
    },
    deviceId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = { modbusRTUs, modbusTCPs };
