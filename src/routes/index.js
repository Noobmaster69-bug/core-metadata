const newDevice = require("./newDevices.route");
const getAllSchedule = require("./getAllSchedule");
// const getCommand = require("./getCommand");
const gateway = require("./gateway.router");
const model = require("./model.router");
module.exports = function (app) {
  app.use("/model", model);
  app.use("/newDevice", newDevice);
  app.use("/getAllSchedule", getAllSchedule);
  // app.use("/getCommand", getCommand);
  app.use("/gateway", gateway);
};
