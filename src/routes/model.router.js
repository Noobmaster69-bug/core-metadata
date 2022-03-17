const controller = require("../controller/model.controller");
("use strict");
const Router = require("express").Router();
Router.post("/", controller.create);
Router.get("/", controller.get);
Router.delete("/", controller.delete);
Router.put("/", controller.update);
module.exports = Router;
