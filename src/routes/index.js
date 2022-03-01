const newDevice = require("./newDevices.route");
const getAllSchedule = require("./getAllSchedule");
const getCommand = require("./getCommand");
module.exports = function (app) {
  app.use("/newDevice", newDevice);
  app.use("/getAllSchedule", getAllSchedule);
  app.use("/getCommand", getCommand);
};
