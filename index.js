const debug = require("./src/utils/debug")("app");

require("./src/config/index")();
const app = require("express")();
//middleware
require("./src/middleware/index")(app);
//router
require("./src/routes/index")(app);

app.listen(process.env.PORT || 10000, () =>
  debug("core is running on port " + (process.env.PORT || 10000))
);
