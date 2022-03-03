const { gatewayInfo } = require("../model/gateway.model");
const debug = require("../utils/debug")("app/Gateway");
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
  updateGatewayId: async function (req, res) {
    try {
      await gatewayInfo.update(
        {
          values: req.body.gatewayId,
        },
        {
          where: {
            property: "gatewayId",
          },
        }
      );
    } catch (err) {
      debug(err.message);
    }
  },
  createGatewayId: async function (req, res) {
    try {
      await gatewayInfo.create({
        property: "gatewayId",
        values: req.body.gatewayId,
      });
    } catch (err) {
      debug(err.message);
    }
  },
};
