import { injectable } from "inversify";
import { Schema, model } from "mongoose";

interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  favorite: {
    type: String,
    default: "No",
  },
  fileCover: {
    type: String,
  },
  fileName: {
    type: String,
  },
});

const BookModel = model("Book", bookSchema);

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
