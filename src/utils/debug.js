const DEBUG = require("debug");
const debug = DEBUG("metadata");
debug.log = console.log.bind(console);
DEBUG.enable("metadata:*");
module.exports = function (type) {
  return debug.extend(type);
};
