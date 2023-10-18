import { Container } from "inversify";
import { BooksRepository } from "./modules/books/books.service";

const container = new Container();

container.bind(BooksRepository).toSelf().inSingletonScope();

export { container };
