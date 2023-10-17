const express = require("express");
const router = express.Router();
const Book = require("../../../models/books/books");
const counter = require("../../../models/counter");

const transformId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (!book || !id) return res.status(404).json({ error: "Book not found" });
    req.book = book;
  } catch (e) {
    res.status(500).json(e);
  }
  next();
};

router.get("/", async (_, res) => {
  try {
    const books = await Book.find();
    res.render("pages/books/index", { books: books });
  } catch (e) {
    res.status(500).json(e);
  }
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
