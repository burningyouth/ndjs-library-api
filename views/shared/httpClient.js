const axios = require("axios");

const client = axios.create({
  baseURL: process.env.API_URL,
});

module.exports = client;
