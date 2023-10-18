import { Schema, model } from "mongoose";

export interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
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

export const BookModel = model("Book", bookSchema);
