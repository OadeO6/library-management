import sequelize from "../connections/db";
import { Book, Catalog, User } from "../models";
import { Transaction, UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import { UserAlreadyExistsError , DonorNotFoundError, BookNotAvailableError, BookNotBorrowedError, TransactionFailedError, UserNotFoundError } from "../errors/db";
import { UserTokenData, findUserArgType } from "../schemas/types";
import { newBookSchemaType } from "../schemas/librarySchemas";


interface BorrowBookData1 {
  user_id: string;
}

interface BorrowBookData2 {
  catalog_id: string;
}

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
        ISBN: book_data.isbn,
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
