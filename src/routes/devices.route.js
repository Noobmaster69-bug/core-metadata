const controller = require("../controller/devices.controller");
const Router = require("express").Router();
Router.post("/new", controller.newDevices);
Router.delete("/delete", controller.delete);
Router.get("/get", controller.get);
module.exports = Router;
