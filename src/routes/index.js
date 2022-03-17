const devices = require("./devices.router");
const schedule = require("./schedule.router");
const gateway = require("./gateway.router");
const models = require("./model.router");
const asMqtt = require("./asMqtt.router");
module.exports = function (app) {
  app.use("/models", models);
  app.use("/devices", devices);
  app.use("/gateway", gateway);
  app.use("/schedule", schedule);
  app.use("/as-mqtt/", asMqtt);
};
