const controller = require("../controller/model.controller");
("use strict");
const Router = require("express").Router();
Router.post("/create", controller.create);
Router.get("/get", controller.get);
Router.delete("/delete", controller.delete);
Router.post("/update", controller.update);
module.exports = Router;
