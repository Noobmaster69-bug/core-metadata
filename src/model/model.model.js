const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const models = sequelize.define(
  "models",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    manufacture: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
const channels = sequelize.define("channels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    modelId: DataTypes.INTEGER,
  },
});
const modbusChannels = sequelize.define(
  "channels",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: "compositeIndex",
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: "compositeIndex",
    },
    fc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parse: {
      type: DataTypes.ENUM,
      values: [
        "BigInt64BE",
        "BigInt64LE",
        "BigUInt64BE",
        "BigUInt64LE",
        "DoubleBE",
        "DoubleLE",
        "FloatBE",
        "FloatLE",
        "Int8",
        "Int16BE",
        "Int16LE",
        "Int32BE",
        "Int32LE",
        "IntBE",
        "IntLE",
        "UInt8",
        "UInt16BE",
        "UInt16LE",
        "UInt32BE",
        "UInt32LE",
        "UIntBE",
        "UIntLE",
      ],
      allowNull: false,
    },
    parser: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    indexes: [{ fields: ["modelName", "addr"], unique: true }],
  }
);
module.exports = {
  models,
  channels,
  modbusChannels,
};
