const debug = require("../utils/debug")("app/getAllSchedule");
const { property } = require("../model/device.model");
module.exports = {
  getAllSchedule: async function (req, res) {
    res.send(await property.findAll());
  },
};
