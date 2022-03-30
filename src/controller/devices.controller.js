const debug = require("../utils/debug")("app/newDevices");
const {
  models,
  devices,
  modbusRTUs,
  modbusTCPs,
  mqtts,
  modbusChannels,
} = require("../model/index");
const { Op } = require("sequelize");
module.exports = {
  new: async function (req, res) {
    const {
      name,
      interval,
      southProtocol,
      northProtocol,
      startTime,
      modelId,
      isProvision,
      isPersistence,
    } = req.body;
    if (northProtocol) {
      if (
        northProtocol.type === "mqtt" &&
        northProtocol.wsOption !== undefined
      ) {
        northProtocol.wsOption = JSON.stringify(northProtocol.wsOption);
      }
    }
    try {
      const deviceInstance = {
        name,
        interval,
        southProtocol: southProtocol.type,
        startTime,
        modelId: modelId,
        isProvision,
        isPersistence,
        [southProtocol.type]: {
          ...southProtocol,
        },
      };
      if (northProtocol) {
        Object.assign(deviceInstance, {
          northProtocol: northProtocol.type,
          [northProtocol.type]: {
            ...northProtocol,
          },
        });
      }
      console.log(deviceInstance);
      await devices.create(deviceInstance, {
        include: [
          { association: devices.modbusRTUs },
          { association: devices.modbusTCPs },
          { association: devices.mqtts },
        ],
      });
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
    const { name = null, id = null } = req.query;
    try {
      await devices.destroy({ where: { [Op.or]: { name: name, id: id } } });
      return res.sendStatus(200);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
  get: async function (req, res) {
    const { name = null, id = null } = req.query;
    try {
      const result = await devices.findOne({
        where: { [Op.or]: { name: name, id: id } },
        include: [
          { model: models, include: [modbusChannels] },
          { model: modbusRTUs },
          { model: modbusTCPs },
          { model: mqtts },
        ],
      });
      if (result) {
        return res.send(result.toJSON());
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
  getDevicesInfo: async function (req, res) {
    try {
      const result = await devices.findAll({
        include: [
          { model: models },
          { model: modbusRTUs },
          { model: modbusTCPs },
          { model: mqtts },
        ],
      });
      if (result) {
        return res.send(result.map((e) => e.toJSON()));
      } else {
        throw new Error();
      }
    } catch (err) {
      debug(err.message);
      return res.sendStatus(404);
    }
  },
};
