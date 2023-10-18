import { injectable } from "inversify";
import { BookModel, IBook } from "./books.model";

import "reflect-metadata";

@injectable()
export class BooksRepository {
  getBooks() {
    return BookModel.find().select("-__v");
  }
  getBook(id: Id) {
    return BookModel.findById(id).select("-__v");
  }
  async createBook(book: IBook) {
    const newBook = new BookModel(book);
    await newBook.save();
    return newBook;
  }
  updateBook(id: Id, book: IBook) {
    return BookModel.findByIdAndUpdate(id, book);
  }
  deleteBook(id: Id) {
    return BookModel.findByIdAndRemove(id);
  }
}
