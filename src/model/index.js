const {
  southProtocols,
  modbusRTUs,
  modbusTCPs,
} = require("./southProtocol.model");
const { models, modbusChannels } = require("./model.model");
const { devices } = require("./device.model");
const { gatewayInfo } = require("./gateway.model");
const { northProtocols, mqtts } = require("./northProtocol.model");
const debug = require("../utils/debug")("model");
const sequelize = require("../config/sequelize");
devices.southProtocols = devices.belongsTo(southProtocols, {
  foreignKey: "southProtocolId",
  onDelete: "CASCADE",
});
modbusRTUs.southProtocols = modbusRTUs.belongsTo(southProtocols, {
  foreignKey: "southProtocolId",
  onDelete: "CASCADE",
});
modbusTCPs.southProtocols = modbusTCPs.belongsTo(southProtocols, {
  foreignKey: "southProtocolId",
  onDelete: "CASCADE",
});
devices.northProtocols = devices.belongsTo(northProtocols, {
  foreignKey: "northProtocolId",
  onDelete: "CASCADE",
});
mqtts.northProtocols = mqtts.belongsTo(northProtocols, {
  foreignKey: "northProtocolId",
  onDelete: "CASCADE",
});
devices.models = devices.belongsTo(models, {
  foreignKey: "modelId",
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
  southProtocols,
  modbusRTUs,
  modbusTCPs,
  models,
  modbusChannels,
  devices,
  gatewayInfo,
  northProtocols,
  mqtts,
};
