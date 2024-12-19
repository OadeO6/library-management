import sequelize from "../connections/db";
import { Book, Catalog, User } from "../models";
import { Transaction, UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import { UserAlreadyExistsError , DonorNotFoundError, BookNotAvailableError, BookNotBorrowedError, TransactionFailedError, UserNotFoundError } from "../errors/db";
import { UserTokenData, findUserArgType } from "../schemas/types";
import { DBBooksRequestParams, newBookSchemaType, viewBooksFullRequestParamsType } from "../schemas/librarySchemas";



interface ReturnBookData1 {
  user_id: string;
}

interface ReturnBookData2 {
  book_id: string;
}

interface GetBooksData {
  available?: boolean;
}

interface GetBooksByCatalogIdData {
  catalog_id: string;
}


// User Operations
export const createUser = async (data: User): Promise<User> => {
  try {
    return await User.create(data);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new UserAlreadyExistsError(`User with email ${data.email} already exists.`);
    }
    // Handle other errors, such as database issues or validation errors
    throw new TransactionFailedError("creating user", error.message);
  }
};

export const findUser = async (data: findUserArgType): Promise<User | null> => {
  try {
    const user = await User.findOne({ where: { ...data } });
    return user;
  } catch (error) {
    throw new TransactionFailedError("finding user", error.message);
  }
};

// 1. Add Book
export const AddBook = async (
  user: UserTokenData,
  book_data: newBookSchemaType
): Promise<[Catalog, Book[], number, string]> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const catalog: Catalog = await Catalog.create(
      {
        title: book_data.title,
        author: book_data.author,
        isbn: book_data.isbn,
        edition: book_data.edition,
        publisher: book_data.publisher,
        publication_year: book_data.publication_year,
        category: book_data.category ? book_data.category : [],
      },
      { transaction }
    );

    let donor = null;
    if (book_data.donor_library_number) {
      donor = await User.findOne({
        where: { library_number: book_data.donor_library_number },
        transaction,
      });
      if (!donor) throw new DonorNotFoundError(`No user with libraray number ${book_data.donor_library_number}`);
    }

    const donor_id = donor ? donor.id : user.id;
    const donor_library_number: string = donor ? book_data.donor_library_number : user.library_number;

    const books: Book[] = [];
    const count: number = book_data.count ? book_data.count : 1;
    for (let i = 0; i < count; i++) {
      books.push(
        await Book.create(
          {
            catalog_id: catalog.id,
            status: "available",
            donor_id: donor_id,
          },
          { transaction }
        )
      );
    }

    await transaction.commit();
    const data =  [catalog, books, count, donor_library_number] as [Catalog, Book[], number, string];
    return data;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof DonorNotFoundError) {
      throw error;
    } else if (error instanceof ForeignKeyConstraintError){
      throw new UserNotFoundError("Something went wrong");
    } else {
      throw new TransactionFailedError("adding books", error.message);
    }
  }
};

// 2. Borrow Book
export const BorrowBook = async (
  user: UserTokenData,
  catalog_id: string
): Promise<string> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const book = await Book.findOne({
      where: { catalog_id, status: "available" },
      transaction,
    });
    if (!book) throw new BookNotAvailableError("No available books for the specified catalog.");

    await book.update(
      { status: "borrowed", borrower_id: user.id },
      { transaction }
    );

    await transaction.commit();
    return book.id;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof BookNotAvailableError) {
      throw error;
    }
    throw new TransactionFailedError("borrowing book", error.message);
  }
};

// 3. Return Book
export const ReturnBook = async (
  book_id: string
): Promise<[string, string]> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const book = await Book.findOne({
      where: { id: book_id, status: "borrowed" },
      transaction,
    });
    if (!book) throw new BookNotAvailableError("No such borrowed Book.");


    await book.update(
      { status: "available", borrower_id: null },
      { transaction }
    );
    // const [updatedRows] = await book.update(
    //   { status: "available", borrower_id: null },
    //   { transaction }
    // );
    //
    // if (updatedRows === 0) throw new BookNotBorrowedError("Book is not currently borrowed or does not exist.");

    await transaction.commit();
    return [book.catalog_id, book.id];
  } catch (error) {
    await transaction.rollback();
    if (error instanceof BookNotAvailableError) {
      throw error;
    }
    throw new TransactionFailedError("Error in returning book", error.message);
  }
};

// 4. Get Books
export const getBooks = async (
  data: viewBooksFullRequestParamsType
): Promise<Catalog[]> => {
  try {
    let book_filter: Object = {};
    let donor_filter: Object = {};
    let borrower_filter: Object = {};
    const catalog_filter = DBBooksRequestParams.parse(data);
    const {
      title,
      author,
      isbn,
      edition,
      publisher,
      publication_year,
      category,
      borrower_library_number, donor_library_number, book_status
    } = data;
    if (book_status) {
      book_filter["status"] = book_status;
    }
    if (borrower_library_number) {
      borrower_filter["library_number"] = borrower_library_number;
    }
    if (donor_library_number) {
      donor_filter["library_number"] = donor_library_number;
    }
    const catalog = await Catalog.findAll({
      attributes: [
        'id',
        'title',
        'author',
        'isbn',
        'edition',
        'publisher',
        'publication_year',
        'category',
        'total_copy',
        'available_copy'
      ],
      where: catalog_filter,
      include: [
        {
          model: Book,
          attributes: [
            'id',
            'status'
          ],
          where: book_filter,
          as: 'books',
          required: true,
          include : [
            {
              model: User,
              attributes: [
                'library_number'
              ],
              where: donor_filter,
              required: false,
              as: 'donor'
            },
            {
              model: User,
              attributes: [
                'library_number'
              ],
              where: borrower_filter,
              required: false,
              as: 'borrower'
            }
          ]
        },
      ]
    });
    return catalog;
  } catch (error) {
    throw new TransactionFailedError("fetching books", error.message);
  }
};

// 5. Get Books by Catalog ID
export const getBooksByCatalogId = async (
  data: GetBooksByCatalogIdData
): Promise<Book[]> => {
  try {
    return await Book.findAll({
      where: { catalog_id: data.catalog_id },
      attributes: ["id", "status", "donor_id", "added_by"],
    });
  } catch (error) {
    throw new TransactionFailedError("fetching books by catalog ID", error.message);
  }
};
