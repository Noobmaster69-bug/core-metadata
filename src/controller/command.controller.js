const debug = require("../utils/debug")("app/getCommand");
const { command, channels } = require("../model/device.model");
module.exports = {
  getCommandByName: async function (req, res) {
    const { name } = req.body;
    try {
      return res.send(
        (
          await command.findAll({
            where: { name: name },
            include: { model: channels },
          })
        )[0]
      );
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
};
