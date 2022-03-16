const {
  southProtocols,
  modbusRTUs,
  modbusTCPs,
} = require("./southProtocol.model");
const { models, channels, modbusChannels } = require("./model.model");
const { devices } = require("./device.model");
const { gatewayInfo } = require("./gateway.model");
const { northProtocols, mqtts } = require("./northProtocol.model");
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
channels.models = devices.belongsTo(models, {
  foreignKey: "modelId",
  onDelete: "CASCADE",
});
modbusChannels.channels = modbusChannels.belongsTo(channels, {
  foreignKey: "channelId",
  onDelete: "CASCADE",
});
(async function () {
  try {
    await sequelize.sync();
    debug("All models were synchronized successfully.");
  } catch (err) {
    debug(err);
    console.log(err);
  }
})();

module.exports = {
  southProtocols,
  modbusRTUs,
  modbusTCPs,
  models,
  channels,
  modbusChannels,
  devices,
  gatewayInfo,
  northProtocols,
  mqtts,
};
