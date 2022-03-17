const debug = require("../utils/debug")("app/newDevices");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
  mqtts,
} = require("../model/index");
module.exports = {
  newDevices: async function (req, res) {
    const { name, interval, southProtocol, northProtocol, startTime, model } =
      req.body;
    try {
      await devices.create(
        {
          name,
          interval,
          southProtocol: {
            type: southProtocol.type,
            [southProtocol.type]: {
              ...southProtocol,
            },
          },
          northProtocol: {
            type: northProtocol.type,
            [northProtocol.type]: {
              ...northProtocol,
            },
          },
          startTime,
          modelId: model,
        },
        {
          include: [
            {
              association: devices.southProtocols,
              include: [
                {
                  association: modbusRTUs.southProtocols,
                },
                { association: modbusTCPs.southProtocols },
              ],
            },
            {
              association: devices.northProtocols,
              include: [mqtts.northProtocols],
            },
          ],
        }
      );
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      try {
        if (err.errors[0].message === "name must be unique") {
          throw new Error("Device name existed");
        }
        if (
          err.parent.table !== "devices" &&
          err.message === "Validation error"
        ) {
          try {
            (await devices.findOne({ name: name })).destroy();
          } catch (err) {
            throw new Error(err);
          }
        } else {
          throw new Error("Not handled error");
        }
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  },
  delete: async function (req, res) {
    const { name } = req.query;
    try {
      await devices.destroy({ where: { name: name } });
      return res.sendStatus(200);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
  get: async function (req, res) {
    const { name } = req.query;
    try {
      const result = await devices.findOne({
        where: { name: name },
        include: [
          { model: models, include: [channels] },
          { model: modbusRTUs },
          { model: modbusTCPs },
        ],
      });
      if (result) {
        return res.send(result);
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
};
