const controller = require("../controller/gateway.controller");
const Router = require("express").Router();
Router.get("/", controller.getGatewayId);
Router.put("/", controller.createGatewayId);
module.exports = Router;
