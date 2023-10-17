"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var books_1 = require("./books");
var container = new inversify_1.Container();
exports.container = container;
container.bind(books_1.BooksRepository).toSelf();
