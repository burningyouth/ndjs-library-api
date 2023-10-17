const express = require("express");
const fileMulter = require("../middlewares/files");
const container = require("../../models/inversify.config");
const BooksRepository = require("../../models/books");

const router = express.Router();

const repo = container.get(BooksRepository);

router
  .route("/books")
  .get(async (_, res) => {
    try {
      const books = await repo.getBooks();
      res.status(200).json(books);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .post(fileMulter.single("fileBook"), async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "Book not given" });
    const path = req.file?.path;
    try {
      const book = await repo.createBook({ fileBook: path, ...req.body });
      res.status(200).json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  });

router
  .route("/books/:id")
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const book = await repo.getBook(id);
      res.status(200).json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const path = req.file?.path;
    try {
      const book = await repo.updateBook(
        id,
        path
          ? {
              ...req.body,
              fileBook: path,
            }
          : req.body
      );
      res.status(200).json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      await repo.deleteBook(id);
      res.status(200).json("ok");
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get("/books/:id/download", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await repo.getBook(id);
    if (!book?.fileBook)
      return res.status(404).json({ error: "Book file not found" });
    res.download(book.fileBook);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
