const controller = require("../controller/devices.controller");
const Router = require("express").Router();
Router.post("/", controller.new);
Router.delete("/", controller.delete);
Router.get("/", controller.get);
module.exports = Router;
