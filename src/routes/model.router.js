const controller = require("../controller/model.controller");
const Router = require("express").Router();
Router.post("/create", controller.create);
Router.get("/get", controller.get);
module.exports = Router;
