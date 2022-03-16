const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const southProtocols = sequelize.define("southProtocols", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
  },
});
const modbusRTUs = sequelize.define(
  "modbusRTUs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
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
    unitId: {
      type: DataTypes.STRING,
      unique: "compositeIndex",
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = { southProtocols, modbusRTUs, modbusTCPs };
