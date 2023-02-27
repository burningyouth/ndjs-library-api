const express = require("express");
const path = require("path");
const booksView = require("./views/pages/books/router");
const auth = require("./api/routes/auth");
const books = require("./api/routes/books");
const counter = require("./api/routes/counter");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/uploads/")));

//view
app.use("/", booksView);

//api
app.use("/api", auth);
app.use("/api", books);
app.use("/api", counter);

//app.use(error404);

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
