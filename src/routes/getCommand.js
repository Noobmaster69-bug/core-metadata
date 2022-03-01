const controller = require("../controller/command.controller");
const Router = require("express").Router();
module.exports = Router.use("/ByName", controller.getCommandByName);
