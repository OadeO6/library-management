import { Request, Response } from 'express';
import { AddBook } from '../crud/db';
import { Book, Catalog } from '../models';
import { UserTokenData } from '../schemas/types';
import { newBookResponseSchema } from '../schemas/librarySchemas';
import { responseError } from '../errors/utils';

export const addBook = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTokenData;
    const data = req.body;

    const [catalog, books, count, donor_library_number] = await AddBook(user, data);
    res.status(201).json(
      newBookResponseSchema.parse({
        message: `${count > 1 ? 'Books': 'Book' } created successfully`,
        catalog_id: catalog.id,
        number_of_book_created: count,
        book_name: catalog.title,
        book_author: catalog.author,
        donor_library_number,
        books_ids: books
      })
    );
  } catch (error) {
    res.status(500).json(responseError("Internal Server Error", error));
  }
};

export const viewBooks = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Endpoint not ready"});
  } catch (error) {
    res.status(500).json(responseError("Internal Server Error", error));
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Endpoint not ready"});
  } catch (error) {
    res.status(500).json(responseError("Internal Server Error", error));
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Endpoint not ready"});
  } catch (error) {
    res.status(500).json(responseError("Internal Server Error", error));
  }
};
