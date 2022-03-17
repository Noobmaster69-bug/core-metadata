const devices = require("./devices.route");
const getAllSchedule = require("./getAllSchedule");
const gateway = require("./gateway.router");
const models = require("./model.router");
module.exports = function (app) {
  app.use("/models", models);
  app.use("/devices", devices);
  app.use("/gateway", gateway);
  app.use("/getAllSchedule", getAllSchedule);
};
