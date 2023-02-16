const auth = require("./routes/auth");
//const books = require("./routes/books");
const express = require("express");
const error404 = require("./middlewares/404");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;

app.use("/", auth);
//app.use("/", books);

app.use(express.json());
app.use(express.static(path.join(__dirname, "/uploads/")));
app.use(error404);

app.listen(3001, () => console.log(`API started on port ${PORT}`));
