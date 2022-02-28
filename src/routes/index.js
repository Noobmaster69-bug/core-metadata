const newDevice = require("./newDevices.route");
const getAllSchedule = require("./getAllSchedule");
module.exports = function (app) {
  app.use("/newDevice", newDevice);
  app.use("/getAllSchedule", getAllSchedule);
};
