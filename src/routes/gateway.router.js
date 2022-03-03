const controller = require("../controller/gateway.controller");
const Router = require("express").Router();
Router.use("/getGatewayId", controller.getGatewayId);
Router.use("/updateGatewayId", controller.updateGatewayId);
Router.use("/createGatewayId", controller.createGatewayId);
module.exports = Router;
