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
  .post((req, res) => {
    const book = req.body;
    if (!book?.id)
      return res.status(400).json({ error: "Book id is required" });
    if (db.books[book.id])
      return res.status(400).json({ error: "Book exists" });
    db.books[book.id] = book;
    res.status(201).json(book);
  });

router.use("/books/:id", (req, res, next) => {
  const id = req.params.id;
  const book = db.books[id];
  if (!book || !id) return res.status(404).json({ error: "Book not found" });
  next();
});

router
  .route("/books/:id")
  .post(fileMulter.single("data"), (req, res) => {
    const id = req.params.id;
    if (!req.file) return res.status(400).json({ error: "File not given" });
    const path = req.file.path;
    res.status(200).json({ path });
    db.books[id].fileBook = path;
  })
  .get((req, res) => {
    const id = req.params.id;
    const book = db.books[id];

    res.status(200).json(book);
  })
  .put((req, res) => {
    const id = req.params.id;
    const book = db.books[id];

    //id is immutable
    const newBook = { ...book, ...req.body, id: book.id };
    db.books[id] = newBook;
    res.status(200).json(newBook);
  })
  .delete((req, res) => {
    const id = req.params.id;
    delete db.books[id];
    res.status(200).send("ok");
  });

module.exports = router;
