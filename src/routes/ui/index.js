const express = require("express");
const model = require("../../models/books");

const router = express.Router();

const transformId = (req, res, next) => {
  const id = +req.params.id;
  const book = model.getBook(id);
  if (!book || !id || isNaN(id))
    return res.status(404).json({ error: "Book not found" });
  req.book = book;
  next();
};

router.get("/", (_, res) => {
  res.render("pages/books/index", { books: model.getBooks() });
});

router.get("/create", (_, res) => {
  res.render("pages/books/create", { create: model.addBook });
});

router.get("/:id", transformId, (req, res) => {
  res.render("pages/books/view", { book: req.book });
});

router.get("/update/:id", transformId, (req, res) => {
  res.render("pages/books/update", {
    book: req.book,
  });
});

router.get("*", transformId, (req, res) => {
  res.render("pages/404");
});

module.exports = router;
