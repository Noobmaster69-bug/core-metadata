const debug = require("../utils/debug")("app/getAllSchedule");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
  modbusChannels,
  mqtts,
} = require("../model/index");
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
          attributes: { exclude: ["modelId", "id"] },
          include: [
            {
              model: models,
              include: [
                {
                  model: modbusChannels,
                  attributes: { exclude: ["modelId"] },
                },
              ],
            },
            {
              model: modbusRTUs,
              attributes: { exclude: ["deviceId", "id"] },
            },
            {
              model: modbusTCPs,
              attributes: { exclude: ["deviceId", "id"] },
            },
            {
              model: mqtts,
              attributes: ["id"],
            },
          ],
        })
      ).map((e) => e.toJSON());

      if (result) {
        result.forEach((e) => {
          e.channels = e.model[e.model.type];
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
