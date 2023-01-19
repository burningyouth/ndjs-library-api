const express = require("express");

const db = {
  books: {},
};
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Server started on port 3000"));

app.route("/api/user/login").post((_, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app
  .route("/books")
  .get((_, res) => {
    res.status(200).json(Object.values(db.books));
  })
  .post((req, res) => {
    const book = req.body;
    if (!book?.id)
      return res.status(400).json({ error: "Book id is required" });
    db.books[book.id] = book;
    res.status(201).json(book);
  });

app
  .route("/books/:id")
  .get((req, res) => {
    const id = req.params.id;
    const book = db.books[id];
    if (!book || !id) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  })
  .put((req, res) => {
    const id = req.params.id;
    const book = db.books[id];
    if (!book || !id) return res.status(404).json({ error: "Book not found" });
    //id is immutable
    const newBook = { ...book, ...req.body, id: book.id };
    db.books[id] = newBook;
    res.status(200).json(newBook);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const book = db.books[id];
    if (!book || !id) return res.status(404).json({ error: "Book not found" });
    delete db.books[id];
    res.status(200).send("ok");
  });
