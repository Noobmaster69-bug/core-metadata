const debug = require("../utils/debug")("app/getAllSchedule");
const { mqtts } = require("../model/index");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");
module.exports = {
  getAll: async function (req, res) {
    const configs = (
      await mqtts.findAll({
        attributes: {
          exclude: ["id", "deviceId"],
        },
        group: [
          "host",
          "port",
          "protocol",
          "wsOption",
          "keepalive",
          "reschedulePings",
          "reconnectPeriod",
          "connectTimeout",
          "username",
          "password",
          "queueQoZero",
          "qos",
        ],
      })
    ).map((e) => e.toJSON());
    for (const config of configs) {
      config.ids = (
        await mqtts.findAll({
          where: { ...config },
          attributes: ["deviceId"],
        })
      ).map((e) => e.toJSON().deviceId);
    }
    res.send(configs);
  },
  defaultConfig: async function (req, res) {
    try {
      mqtts.create(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
