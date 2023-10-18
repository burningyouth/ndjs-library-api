import express from "express";
import path from "path";
import { BooksRouter } from "./api/modules/books/books.router";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || "3000";
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/uploads/")));

//api
app.use("/api", BooksRouter);

const start = async (port: string, dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    app.listen(port, () => console.log(`App started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start(PORT, MONGO_URL);
