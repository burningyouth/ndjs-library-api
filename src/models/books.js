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

const getRealId = (id) => {
  return id - 1;
};

const addBook = (book) => {
  const id = db.books.length + 1;
  const realId = getRealId(id);
  db.books.push({ id, ...book });
  return db.books[realId];
};

const getBook = (id) => {
  return db.books[getRealId(id)];
};

const getBooks = () => {
  return db.books;
};

const updateBook = (id, book) => {
  const realId = getRealId(id);
  const prevBook = db.books[realId];
  db.books[realId] = { ...prevBook, ...book, id };
  return db.books[realId];
};

const deleteBook = (id) => {
  delete db.books[getRealId(id)];
};

module.exports = {
  addBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
};
