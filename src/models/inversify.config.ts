import { Container } from "inversify";
import { BooksRepository } from "./books";

const container = new Container();

container.bind(BooksRepository).toSelf();

export { container };
