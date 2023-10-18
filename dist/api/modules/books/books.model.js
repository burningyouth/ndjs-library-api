"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var mongoose_1 = require("mongoose");
var bookSchema = new mongoose_1.Schema({
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
exports.BookModel = (0, mongoose_1.model)("Book", bookSchema);
