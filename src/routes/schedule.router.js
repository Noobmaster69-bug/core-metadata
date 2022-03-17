const controller = require("../controller/schedule.controller");
const Router = require("express").Router();
Router.get("/getAll", controller.getAllSchedule);
module.exports = Router;
