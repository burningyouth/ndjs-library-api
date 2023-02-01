const express = require("express");
const model = require("../../models/books");

const router = express.Router();

router.get("/", (_, res) => {
  res.render("pages/books/index", { books: model.getBooks() });
});

router.get("/create", (_, res) => {
  res.render("pages/books/create", { create: model.addBook });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.render("pages/books/view", { book: model.getBook(id)} );
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;

  res.render("pages/books/update", { book: model.getBook(id), update: (newBook) => model.updateBook(id, newBook) });
});

module.exports = router;
