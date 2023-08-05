import { IBook } from "./booking.interface";
import { Book } from "./booking.model";

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find();
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  deleteBook,
};
