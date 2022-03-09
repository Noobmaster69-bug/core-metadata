const debug = require("../utils/debug")("app/getAllSchedule");
const { devices } = require("../model/device.model");
module.exports = {
  getAllSchedule: async function (req, res) {
    res.send(await property.findAll());
  },
};
