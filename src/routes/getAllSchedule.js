const controller = require("../controller/schedule.controller");
const Router = require("express").Router();
module.exports = Router.use("/", controller.getAllSchedule);
