const express = require("express");
const api = require("./routes/api");
const ui = require("./routes/ui");
const error404 = require("./middlewares/404");
const path = require("path");
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, "/uploads/")));
app.use("/api", api);
app.use("/", ui);
app.use(error404);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './views'))

app.listen(3000, () => console.log("Server started on port 3000"));
