const axios = require("axios");

module.exports = axios.create({
  baseUrl: process.env.API_URL,
});
