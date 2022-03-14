const debug = require("../utils/debug")("app/newDevices");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
  channels,
} = require("../model/device.model");
module.exports = {
  newDevices: async function (req, res) {
    const {
      path,
      name,
      interval,
      host,
      southProtocol,
      northProtocol,
      id,
      baudRate,
      northUrl,
      parity,
      stopBits,
      dataBits,
      startTime,
      port,
      model,
    } = req.body;
    try {
      await devices.create(
        {
          name,
          interval,
          southProtocol,
          northProtocol,
          northUrl,
          startTime,
          [southProtocol]: {
            path,
            name,
            host,
            id,
            port,
            baudRate,
            parity,
            stopBits,
            dataBits,
          },
          modelName: model,
        },
        {
          include: [
            { association: devices.modbusRTUs },
            { association: devices.modbusTCPs },
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
