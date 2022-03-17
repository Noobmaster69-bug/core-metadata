const controller = require("../controller/gateway.controller");
const Router = require("express").Router();
Router.get("/getGatewayId", controller.getGatewayId);
Router.put("/updateGatewayId", controller.updateGatewayId);
Router.put("/createGatewayId", controller.createGatewayId);
module.exports = Router;
