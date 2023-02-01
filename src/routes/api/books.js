const express = require("express");
const fileMulter = require("../../middlewares/files");
const model = require("../../models/books");

const router = express.Router();

router
  .route("/books")
  .get((_, res) => {
    res.status(200).json(model.getBooks());
  })
  .post(fileMulter.single("fileBook"), (req, res) => {
    const book = req.body;
    const path = req.file.path;

    if (!book) return res.status(400).json({ error: "Book not given" });
    if (!req.file)
      return res.status(400).json({ error: "Book.fileBook not given" });

    res.status(201).json(model.addBook({ fileBook: path, ...book }));
  });

const checkIfBookExists = (req, res, next) => {
  const id = req.params.id;
  const book = model.getBook(id);
  if (!book || !id) return res.status(404).json({ error: "Book not found" });
  req.book = book;
  next();
};

router
  .route("/books/:id")
  .get(checkIfBookExists, (req, res) => {
    res.status(200).json(req.book);
  })
  .put(checkIfBookExists, (req, res) => {
    const book = req.book;
    res.status(200).json(model.updateBook({ ...book, ...req.body }));
  })
  .delete(checkIfBookExists, (req, res) => {
    const id = req.params.id;
    model.deleteBook(id);
    res.status(200).send("ok");
  });

router.get("/books/:id/download", (req, res) => {
  const id = req.params.id;
  const book = model.getBook(id);
  if (!book?.fileBook)
    return res.status(404).json({ error: "Book file not found" });
  res.download(book.fileBook);
});

module.exports = router;
