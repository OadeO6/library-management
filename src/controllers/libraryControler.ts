import { Request, Response } from 'express';
import { AddBook } from '../crud/db';
import { Book } from '../models';
import { UserTokenData } from '../schemas/types';

export const addBook = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTokenData;
    const data = req.body;

    const books: Book[] = await AddBook(user, data);
    res.status(201).json({ message: books});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const viewBooks = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: "Success"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: "Success"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: "Success"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
