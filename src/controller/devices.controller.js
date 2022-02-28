const debug = require("../utils/debug")("app/newDevices");
const { property, command } = require("../model/device.model");
module.exports = {
  newDevices: async function (req, res) {
    const {
      name,
      interval,
      host,
      method,
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
          method,
          command: {
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
              association: property.command,
              include: [command.channels],
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
