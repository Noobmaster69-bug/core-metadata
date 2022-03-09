const { models, channels } = require("../model/device.model");
const debug = require("../utils/debug")("app/modelController");
module.exports = {
  create: async function (req, res) {
    const { name, channels } = req.body;
    try {
      if (channels) {
        await models.create(
          {
            name,
            channels: [...channels],
          },
          {
            include: [
              {
                association: models.channels,
              },
            ],
          }
        );
        res.sendStatus(201);
      }
    } catch (err) {
      if (err?.parent?.table === "models") {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(400).send("model existed");
        } else {
          return res.sendStatus(400);
        }
      } else if (err?.parent?.table === "channels") {
        (await models.findOne({ where: { name: name } })).destroy();
        if (err.name === "SequelizeUniqueConstraintError") {
          if (err.parent.constraint === "channels_pkey") {
            return res.status(400).send("channel names conflict");
          } else if (err.parent.constraint === "channels_model_name_addr") {
            return res.status(400).send("channel address conflict");
          } else return res.sendStatus(400);
        } else {
          return res.sendStatus(400);
        }
      } else {
        return res.sendStatus(400);
      }
    }
  },
  get: async function (req, res) {
    const { name } = req.query;
    try {
      const result = await models.findOne({
        where: { name: name },
        include: { model: channels },
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
