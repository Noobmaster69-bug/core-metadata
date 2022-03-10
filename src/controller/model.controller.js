const { models, channels } = require("../model/device.model");
const debug = require("../utils/debug")("app/modelController");
const { Op } = require("sequelize");
const controller = {
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
      debug(err);
      try {
        if (err?.parent?.table === "models") {
          if (err.name === "SequelizeUniqueConstraintError") {
            throw new Error("model existed");
          } else {
            throw new Error("");
          }
        } else if (err?.parent?.table === "channels") {
          (await models.findOne({ where: { name: name } })).destroy();
          if (err.name === "SequelizeUniqueConstraintError") {
            if (err.parent.constraint === "channels_pkey") {
              throw new Error("channel names conflict");
            } else if (err.parent.constraint === "channels_model_name_addr") {
              throw new Error("channel address conflict");
            } else throw new Error("");
          } else {
            throw new Error("");
          }
        } else {
          throw new Error("");
        }
      } catch (err) {
        res.status(400).send(err.message);
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
  delete: async function (req, res) {
    const { name } = req.query;
    try {
      await models.destroy({ where: { name: name } });
      return res.sendStatus(200);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
  update: async function (req, res) {
    const { oldName } = req.query;
    try {
      const { body } = req;
      const channel_nameVadidator = body.channels.filter(
        (item, index) =>
          body.channels.findIndex(
            (e) => e.channel_name === item.channel_name
          ) !== index
      );
      const addrVadidator = body.channels.filter(
        (item, index) =>
          body.channels.findIndex((e) => e.addr === item.addr) !== index
      );
      if (channel_nameVadidator.length) {
        throw new Error("channel_name duplicated");
      }
      if (addrVadidator.length) {
        throw new Error("addr duplicated");
      }
      await models.update({ name: body.name }, { where: { name: oldName } });
      try {
        const unChangedChannels = await channels.findAll({
          where: {
            channel_name: {
              [Op.in]: body.channels.map((e) => e.channel_name),
            },
            modelName: {
              [Op.in]: [body.name],
            },
            fc: {
              [Op.in]: body.channels.map((e) => e.fc),
            },
            addr: {
              [Op.in]: body.channels.map((e) => e.addr),
            },
            quantity: {
              [Op.in]: body.channels.map((e) => e.quantity),
            },
            parse: {
              [Op.in]: body.channels.map((e) => e.parse),
            },
            parser: {
              [Op.in]: body.channels.map((e) => e.parser),
            },
          },
        });
        const changedChannels = await channels.findAll({
          where: {
            channel_name: {
              [Op.notIn]: unChangedChannels.map((e) => e.channel_name),
            },
          },
        });
        for (const channel of changedChannels) {
          try {
            await channel.destroy();
          } catch (err) {
            throw err;
          }
        }

        const newChannels = body.channels.filter(
          ({ channel_name }) =>
            !unChangedChannels.some((e) => e.channel_name === channel_name)
        );
        for (const channel of newChannels) {
          try {
            await channels.create({ ...channel, modelName: body.name });
          } catch (err) {
            throw err;
          }
        }
        res.sendStatus(200);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      debug(err);
      return res.sendStatus(400);
    }
  },
};
module.exports = controller;
