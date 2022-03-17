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
          "QoS",
        ],
      })
    ).map((e) => e.toJSON());
    for (const config of configs) {
      config.ids = (
        await mqtts.findAll({
          where: { ...config },
          attributes: ["id"],
        })
      ).map((e) => e.toJSON().id);
    }
    res.send(configs);
  },
};
