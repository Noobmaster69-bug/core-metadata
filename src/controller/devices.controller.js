const debug = require("../utils/debug")("app/newDevices");
const { property, dsModbus } = require("../model/device.model");
const axios = require("axios");
module.exports = {
  newDevices: async function (req, res) {
    const {
      name,
      interval,
      NorthProtocol,
      SouthProtocol,
      NorthUrl,
      startTime,
      isProvision,

      host,
      id,
      baudRate,
      parity,
      stopBits,
      dataBits,
      channels,
      port,
    } = req.body;
    try {
      await property.create(
        {
          name,
          interval,
          NorthProtocol,
          SouthProtocol,
          NorthUrl,
          startTime,
          isProvision,
          dsModbus: {
            name,
            host,
            id,
            port,
            baudRate,
            parity,
            stopBits,
            dataBits,
            channels: [...channels],
          },
        },
        {
          include: [
            {
              association: property.dsModbus,
              include: [dsModbus.channels],
            },
          ],
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (
        err.message === "Validation error" &&
        err.parent.table !== "properties"
      ) {
        (await property.findOne({ name: name })).destroy();
        res.sendStatus(404);
      } else {
        res.sendStatus(404);
      }
    }
  },
};
