import { Request, Response } from 'express';
import { AddBook } from '../crud/db';
import { Book } from '../models';
import { UserTokenData } from '../schemas/types';
import { newBookResponseSchema } from '../schemas/librarySchemas';

export const addBook = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTokenData;
    const data = req.body;

    const books: Book[] = await AddBook(user, data);
    console.log(books)
    res.status(201).json(
      newBookResponseSchema.parse({ message: books})
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const viewBooks = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Endpoint not ready"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Endpoint not ready"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Endpoint not ready"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
