const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const config = {
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
  },
};

module.exports = withPWA(config);