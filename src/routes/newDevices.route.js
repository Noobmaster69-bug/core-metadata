const controller = require("../controller/devices.controller");
const Router = require("express").Router();
module.exports = Router.use("/", controller.newDevices);
