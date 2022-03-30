const { modbusRTUs, modbusTCPs } = require("./downProtocol.model");
const { models, modbusChannels } = require("./model.model");
const { devices } = require("./device.model");
const { gatewayInfo } = require("./gateway.model");
const { mqtts } = require("./upProtocol.model");
const debug = require("../utils/debug")("model");
const sequelize = require("../config/sequelize");
devices.modbusRTUs = devices.hasOne(modbusRTUs, {
  foreignKey: "deviceId",
  onDelete: "CASCADE",
});
devices.modbusTCPs = devices.hasOne(modbusTCPs, {
  foreignKey: "deviceId",
  onDelete: "CASCADE",
});
devices.mqtts = devices.hasOne(mqtts, {
  foreignKey: "deviceId",
  onDelete: "CASCADE",
});
mqtts.devices = mqtts.belongsTo(devices, {
  foreignKey: "deviceId",
  onDelete: "CASCADE",
});
devices.models = devices.belongsTo(models, {
  foreignKey: { name: "modelId", allowNull: true },
});
models.hasOne(devices, {
  foreignKey: { name: "modelId", allowNull: true },
});
models.modbusChannels = models.hasMany(modbusChannels, {
  foreignKey: "modelId",
  onDelete: "CASCADE",
});
async function sync() {
  try {
    await sequelize.sync();
    debug("All models were synchronized successfully.");
  } catch (err) {
    if (
      err.message === 'database "core" does not exist' ||
      err.message === "read ECONNRESET"
    ) {
      sync();
    } else {
      debug(err.message);
    }
  }
}
sync();
module.exports = {
  modbusRTUs,
  modbusTCPs,
  models,
  modbusChannels,
  devices,
  gatewayInfo,
  mqtts,
};
