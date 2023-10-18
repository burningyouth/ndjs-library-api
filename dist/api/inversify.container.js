"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var books_service_1 = require("./modules/books/books.service");
var container = new inversify_1.Container();
exports.container = container;
container.bind(books_service_1.BooksRepository).toSelf().inSingletonScope();
