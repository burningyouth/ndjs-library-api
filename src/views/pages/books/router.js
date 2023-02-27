const express = require("express");
const router = express.Router();
const model = require("../../../models/books");
const counter = require("../../../models/counter");

const transformId = (req, res, next) => {
  const id = +req.params.id;
  const book = model.getBook(id);
  if (!book || !id || isNaN(id))
    return res.status(404).json({ error: "Book not found" });
  req.book = book;
  next();
};

router.get("/", async (_, res) => {
  res.render("pages/books/index", { books: model.getBooks() });
});

router.get("/create", (_, res) => {
  res.render("pages/books/create");
});

router.get("/:id", transformId, async (req, res) => {
  res.render("pages/books/view", {
    book: req.book,
    count: +(await counter.getCount(req.book.id)) + 1,
  });
  counter.increment(req.book.id);
});

router.get("/update/:id", transformId, (req, res) => {
  res.render("pages/books/update", {
    book: req.book,
  });
});

module.exports = router;
