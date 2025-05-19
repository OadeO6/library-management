import { Request, Response } from 'express';
import { AddBook, BorrowBook, getBooks, ReturnBook } from '../../crud/db';
import { UserTokenData } from '../../schemas/types';
import { borrowBookResponseSchema, newBookResponseSchema, returnBookResponseSchema, viewBookResponseSchema, viewBooksFullResponseSchema, viewBooksRequestParams, viewBooksResponseSchema, viewBooksResponseSchemaType } from '../../schemas/librarySchemas';
import { responseError } from '../../errors/utils';
import { BookNotAvailableError } from '../../errors/db';

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
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};

export const viewBooks = async (req: Request, res: Response) => {
  try {
    const data = viewBooksRequestParams.parse(req.query);
    const catalogs = await getBooks(data);
    let response: viewBooksResponseSchemaType;
    const count: number = catalogs.length;
    if (data.detailed == 'true') {
      response = viewBooksFullResponseSchema.parse({
        message: "Detailed list of books gotten successfuly",
        books: catalogs,
        count
      })
    } else {
      response = viewBooksResponseSchema.parse({
        message: "Less detailed list of books gotten successfuly",
        books: catalogs,
        count
      })
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};

export const viewBook = async (req: Request, res: Response) => {
  try {
    // const { catalog_id } = req.params;
    res.status(200).json(
      viewBookResponseSchema.parse({})
    );
  } catch (error) {
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { catalog_id } = req.params;
    const user = req.user as UserTokenData;

    const borrowed_book_id = await BorrowBook(user, catalog_id);
    res.status(200).json(
      borrowBookResponseSchema.parse({
        message: "Book Borrowed Succesfully",
        catalog_id,
        borrowed_book_id,
      })
    );
  } catch (error) {
    if (error instanceof BookNotAvailableError) {
      res.status(404).json(responseError("Book Not Found Error", error));
      return;
    }
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book_id } = req.params;

    const [ catalog_id, returned_book_id ]= await ReturnBook(book_id);
    res.status(200).json(
      returnBookResponseSchema.parse({
        message: "Book Returned Succesfully",
        catalog_id,
        returned_book_id,
      })
    );
  } catch (error) {
    if (error instanceof BookNotAvailableError) {
      res.status(404).json(responseError("Book Not Found Error", error));
      return;
    }
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};
