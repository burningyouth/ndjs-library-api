const express = require("express");
const path = require("path");
const books = require("./pages/books/router");

const app = express();
const PORT = process.env.UI_PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./"));

app.use("/", books);

app.listen(PORT, () => console.log(`View started on port ${PORT}`));
