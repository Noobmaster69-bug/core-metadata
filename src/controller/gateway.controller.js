const { gatewayInfo } = require("../model/index");
const debug = require("../utils/debug")("gatewayId");
const { client } = require("../config/redis");
async function fetchGatewayId() {
  try {
    const result = await gatewayInfo.findOne({
      where: {
        property: "gatewayId",
      },
    });
    await client.set("gatewayId", result.toJSON().values);
  } catch (err) {
    if (err.message === "read ECONNRESET") {
      fetchGatewayId();
    } else {
      debug(err.message);
    }
  }
}
fetchGatewayId();
module.exports = {
  getGatewayId: async function (req, res) {
    try {
      const result = await gatewayInfo.findOne({
        where: {
          property: "gatewayId",
        },
      });
      if (res === undefined) {
        return result.dataValues.values;
      } else {
        return res.send({
          gatewayId: result.dataValues.values,
        });
      }
    } catch (err) {
      debug(err.message);
      if (res !== undefined) {
        return res.sendStatus(404);
      }
    }
  },
  createGatewayId: async function (req, res) {
    try {
      await gatewayInfo.findOrCreate({
        where: { property: "gatewayId" },
        defaults: {
          values: req.body.gatewayId,
        },
      });
      await client.set("gatewayId", req.body.gatewayId);
      return res.sendStatus(201);
    } catch (err) {
      debug(err.message);
      return res.sendStatus(400);
    }
  },
};
