const express = require("express");
const fileMulter = require("../middlewares/files");

const router = express.Router();
const db = {
  books: {},
};

router
  .route("/books")
  .get((_, res) => {
    res.status(200).json(Object.values(db.books));
  })
  .post(fileMulter.single("fileBook"), (req, res) => {
    const book = req.body;
    const id = Object.keys(db.books).length + 1;
    const path = req.file.path;

    if (!book) return res.status(400).json({ error: "Book not given" });
    if (!req.file)
      return res.status(400).json({ error: "Book.fileBook not given" });

    db.books[id] = { id, fileBook: path, ...book };
    res.status(201).json(db.books[id]);
  });

const checkIfBookExists = (req, res, next) => {
  const id = req.params.id;
  const book = db.books[id];
  if (!book || !id) return res.status(404).json({ error: "Book not found" });
  next();
};

router
  .route("/books/:id")
  .get(checkIfBookExists, (req, res) => {
    const id = req.params.id;
    const book = db.books[id];

    res.status(200).json(book);
  })
  .put(checkIfBookExists, (req, res) => {
    const id = req.params.id;
    const book = db.books[id];

    //id is immutable
    const newBook = { ...book, ...req.body, id: book.id };
    db.books[id] = newBook;
    res.status(200).json(newBook);
  })
  .delete(checkIfBookExists, (req, res) => {
    const id = req.params.id;
    delete db.books[id];
    res.status(200).send("ok");
  });

router.get("/books/:id/download", (req, res) => {
  const id = req.params.id;
  const book = db.books[id];
  if (!book?.fileBook)
    return res.status(404).json({ error: "Book file not found" });
  res.download(book.fileBook);
});

module.exports = router;
