const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const debug = require("../utils/debug")("model");
const devices = sequelize.define(
  "devices",
  {
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
    southProtocol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    northProtocol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

const northUrls = sequelize.define(
  "northUrls",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    protocol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
northUrls.northProtocol = northUrls.belongsTo(devices, {
  foreignKey: "northUrl",
});

const modbusRTUs = sequelize.define(
  "modbusRTUs",
  {
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
    id: {
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
devices.modbusRTUs = devices.hasOne(modbusRTUs);
const modbusTCPs = sequelize.define(
  "modbusTCPs",
  {
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
  },
  {
    timestamps: false,
  }
);
devices.modbusTCPs = devices.hasOne(modbusTCPs);
const models = sequelize.define(
  "models",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
devices.models = devices.belongsTo(models, {
  foreignKey: {
    type: DataTypes.STRING,
  },
});
const channels = sequelize.define(
  "channels",
  {
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: "compositeIndex",
    },
    modelName: {
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
models.channels = models.hasMany(channels);
(async function () {
  try {
    await sequelize.sync();
    debug("All models were synchronized successfully.");
  } catch (err) {
    debug("Sync fail, restarting server");
    require("child_process").spawn(
      /^win/.test(process.platform) ? "pm2.cmd" : "pm2",
      ["restart", "core-metadata"]
    );
    process.send("ready");
  }
})();
module.exports = {
  devices,
  channels,
  modbusRTUs,
  modbusTCPs,
  northUrls,
  models,
};
