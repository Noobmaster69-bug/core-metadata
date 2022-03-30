const controller = require("../controller/model.controller");
const Router = require("express").Router();
Router.post("/", controller.create);
Router.get("/", controller.get);
Router.delete("/", controller.delete);
Router.put("/", controller.update);
Router.get("/info", controller.getModelInfo);
module.exports = Router;
