const { models, modbusChannels } = require("../model/index");
const debug = require("../utils/debug")("app/modelController");
const { Op } = require("sequelize");
const controller = {
  create: async function (req, res) {
    const { name, channels, manufacture, type } = req.body;
    console.log(req.body);
    try {
      if (channels) {
        await models.create(
          {
            name,
            manufacture,
            type,
            [type]: [...channels],
          },
          {
            include: [
              {
                association: models.modbusChannels,
              },
            ],
          }
        );
        res.sendStatus(201);
      }
    } catch (err) {
      console.log(err);
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
    const { name = null, id = null } = req.query;
    try {
      const result = await models.findOne({
        where: { [Op.or]: { name: name, id: id } },
        include: { model: modbusChannels },
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
    const { name = null, id = null } = req.query;
    try {
      await models.destroy({ where: { [Op.or]: { name: name, id: id } } });
      return res.sendStatus(200);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
  update: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      const { body } = req;
      await models.update(
        { name: body.name, manufacture: body.manufacture, type: body.type },
        { where: { [Op.or]: { name: name, id: id } } }
      );
      for (const channel of body.channels) {
        switch (body.type) {
          case "modbusChannels":
            try {
              await modbusChannels.update(
                { ...channel },
                { where: { id: channel.id } }
              );
            } catch (err) {
              console.log(err);
              throw new Error(err.message);
            }
        }
      }
      res.send(201);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  },
};
module.exports = controller;
