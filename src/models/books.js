const db = {
  books: [
    {
      id: 1,
      title: "Book 1",
      description: "Description 1",
      fileBook: "path/to/file",
      authors: "Author 1, Author 2",
      favorite: "YES",
    },
  ],
};

const addBook = (book) => {
  const id = db.books.length + 1;
  db.books[id] = { id, ...book };
  return db.books[id];
};

const getBook = (id) => {
  return db.books[id];
};

const getBooks = () => {
  return db.books;
};

const updateBook = (id, book) => {
  db.books[id] = { ...book, id };
  return db.books[id];
};

const deleteBook = (id) => {
  delete db.books[id];
};

module.exports = {
  addBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
};
