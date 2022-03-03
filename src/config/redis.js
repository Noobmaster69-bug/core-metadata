const { createClient } = require("redis");
const client = createClient();
const subscriber = client.duplicate();
const gatewayInfo = require("../controller/gateway.controller");
(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));

  try {
    await client.connect();
    await subscriber.connect();
    await client.set("gatewayId", await gatewayInfo.getGatewayId());
  } catch (err) {
    console.log(err);
  }
})();

module.exports = { client, subscriber };
