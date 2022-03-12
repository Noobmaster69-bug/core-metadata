const debug = require("../utils/debug")("app/newDevices");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
} = require("../model/device.model");
const axios = require("axios");
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
          // [southProtocol]: {
          //   path,
          //   name,
          //   host,
          //   id,
          //   port,
          //   baudRate,
          //   parity,
          //   stopBits,
          //   dataBits,
          // },
          model,
        }
        // {
        //   include: [modbusRTUs.devices, modbusTCPs.devices],
        // }
      );
      res.sendStatus(200);
    } catch (err) {
      debug(err);
      // try {
      //   // (await devices.findOne({ name: name })).destroy();
      //   res.sendStatus(404);
      // } catch (err) {
      //   debug(err);
      //   res.sendStatus(404);
      // }
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
        include: [],
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
