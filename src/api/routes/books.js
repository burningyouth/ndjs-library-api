const express = require("express");
const fileMulter = require("../middlewares/files");
const Book = require("../../models/books");

const router = express.Router();

router
  .route("/books")
  .get(async (_, res) => {
    try {
      const books = await Book.find().select("-__v");
      res.status(200).json(books);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .post(fileMulter.single("fileBook"), async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "Book not given" });
    const path = req.file?.path;
    const book = new Book({ fileBook: path, ...req.body });

    try {
      await book.save();
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
      const book = await Book.findById(id).select("-__v");
      res.status(200).json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const path = req.file?.path;
    try {
      const book = await Book.findByIdAndUpdate(
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
      await Book.findByIdAndRemove(id);
      res.status(200).json("ok");
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get("/books/:id/download", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id).select("-__v");
    if (!book?.fileBook)
      return res.status(404).json({ error: "Book file not found" });
    res.download(book.fileBook);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
