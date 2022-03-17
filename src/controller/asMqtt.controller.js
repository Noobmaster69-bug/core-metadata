const debug = require("../utils/debug")("app/getAllSchedule");
const { mqtts } = require("../model/index");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");
module.exports = {
  getAll: async function (req, res) {
    const result = await mqtts.findAll({
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
    });
    res.send(result);
  },
};
