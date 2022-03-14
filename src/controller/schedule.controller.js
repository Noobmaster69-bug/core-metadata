const debug = require("../utils/debug")("app/getAllSchedule");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
  channels,
} = require("../model/device.model");
const { Op } = require("sequelize");
module.exports = {
  getAllSchedule: async function (req, res) {
    try {
      const result = (
        await devices.findAll({
          where: {
            [Op.or]: [
              {
                isProvision: {
                  [Op.not]: false,
                },
              },
              {
                isPersistence: { [Op.not]: false },
              },
            ],
          },
          attributes: { exclude: ["modelName"] },
          include: [
            {
              model: models,

              include: [
                { model: channels, attributes: { exclude: ["modelName"] } },
              ],
            },
            {
              model: modbusRTUs,
              attributes: { exclude: ["name", "deviceName"] },
            },
            {
              model: modbusTCPs,
              attributes: { exclude: ["name", "deviceName"] },
            },
          ],
        })
      ).map((e) => e.toJSON());

      if (result) {
        result.forEach((e) => {
          e.channels = e.model.channels;
          delete e.model;
          if (e.modbusRTU === null) {
            delete e.modbusRTU;
          }
          if (e.modbusTCP === null) {
            delete e.modbusTCP;
          }
        });
        return res.send(result);
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err);
      return res.sendStatus(404);
    }
  },
};
