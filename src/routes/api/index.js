const auth = require("./auth");
const books = require("./books");
const express = require("express");

const route = express.Router();

route.use("/", auth);
route.use("/", books);

module.exports = route;
