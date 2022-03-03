const newDevice = require("./newDevices.route");
const getAllSchedule = require("./getAllSchedule");
const getCommand = require("./getCommand");
const gateway = require("./gateway.router");
module.exports = function (app) {
  app.use("/newDevice", newDevice);
  app.use("/getAllSchedule", getAllSchedule);
  app.use("/getCommand", getCommand);
  app.use("/gateway", gateway);
};
