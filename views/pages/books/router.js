const express = require("express");
const client = require("../../shared/httpClient");
const router = express.Router();

const transformId = (req, res, next) => {
  const id = +req.params.id;
  const book = model.getBook(id);
  if (!book || !id || isNaN(id))
    return res.status(404).json({ error: "Book not found" });
  req.book = book;
  next();
};

router.get("/", async (_, res) => {
  try {
    const books = await client.get("/books");
    res.render("pages/books/index", { books: books });
  } catch (e) {
    console.log(e);
    res.status(400);
    res.json(e);
  }
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

module.exports = router;
