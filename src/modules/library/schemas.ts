import { z } from "zod";
import {
  extendZodWithOpenApi,
} from "zod-openapi";
import { numericString } from "../../types";
extendZodWithOpenApi(z);


const id = z.string().uuid().openapi({
  example: "9f73c210-b417-409e-ac53-6cf4a0aa36c4"
})
const id_opt = z.string().uuid().optional().openapi({
  example: "9f73c210-b417-409e-ac53-6cf4a0aa36c4"
})
const title = z.string().openapi({
  description: "Book's Title",
  example: "Rich Dad Poor Dad",
})
const title_opt = z.string().optional().openapi({
  description: "Book's Title",
  example: "Rich Dad Poor Dad",
})
const author = z.string().openapi({
  description: "Book's Author",
  example: "Bolanle Jhon",
})
const author_opt = z.string().optional().openapi({
  description: "Book's Author",
  example: "Bolanle Jhon",
})
const isbn = z.string().openapi({
  description: "Book's ISBN number",
  example: "00bookisbnnum",
})
const isbn_opt = z.string().optional().openapi({
  description: "Book's ISBN number",
  example: "00bookisbnnum",
})
const return_count = z.number().min(0).openapi({
  description: "Ammount returned",
  example: 1,
})
const count = z.number().min(1).openapi({
  description: "Ammount of book to be added",
  example: 1,
})
const count_opt = z.number().min(1).optional().openapi({
  description: "Ammount of book to be added",
  example: 1,
})
const edition = z.string().openapi({
  description: "Books's edition",
  example: "5th",
})
const edition_opt = z.string().optional().openapi({
  description: "Books's edition",
  example: "5th",
})
const publisher = z.string().openapi({
  description: "Books's publisher",
  example: "Lison",
})
const publisher_opt = z.string().optional().openapi({
  description: "Books's publisher",
  example: "Lison",
})
const publication_year = numericString.openapi({
  description: "Books's publication year",
  example: 2024,
})
const publication_year_opt = numericString.optional().openapi({
  description: "Books's publication year",
  example: 2024,
})
const category = z.array(z.string()).openapi({
  description: "Books's categories",
  example: ["technology", "literature"],
})
const category_opt = z.array(z.string()).optional().openapi({
  description: "Books's categories",
  example: ["technology", "literature"],
})
const donor_library_number = z.string().openapi({
  description: "Library number of book donator",
  example: "LIB-012344",
})
const donor_library_number_opt = z.string().optional().openapi({
  description: "Library number of book donator",
  example: "LIB-012344",
})
const borrower_library_number = z.string().openapi({
  description: "Library number of a person that borrowed a book",
  example: "LIB-012344",
})
const borrower_library_number_opt = z.string().optional().openapi({
  description: "Library number of a person that borrowed a book",
  example: "LIB-012344",
})

const book_status_opt = z.enum(['available', 'borrowed', 'lost']).optional().openapi({
  description: "Library number of book donator",
  example: "available",
})
const book_status = z.enum(['available', 'borrowed', 'lost']).openapi({
  description: "Library number of book donator",
  example: "available",
})


// User registration schema
export const newBookSchema = z.object({
  title,
  author,
  isbn: isbn_opt,
  count: count_opt,
  edition: edition_opt,
  publisher: publisher_opt,
  publication_year: publication_year_opt,
  category: category_opt,
  donor_library_number: donor_library_number_opt,
})

export const newBookResponseSchema = z.object({
  message: z.string(),
  catalog_id: id,
  number_of_book_created: z.number().openapi({
    example: 1
  }),
  book_name: title,
  book_author: author,
  donor_library_number: donor_library_number_opt,
  books_ids: z.array(
    z.object({id})
  )
})

export const newBookRequest = z.object({
  body: newBookSchema,
});

export const borrowBookRequestParams = z.object({
  catalog_id: z.string().openapi({
    example: "9f73c210-b417-409e-ac53-6cf4a0aa36c4",
    description: 'A Books Catalog ID'
  })
})
export const borrowBookRequest = z.object({
  params: borrowBookRequestParams,
});

export const borrowBookResponseSchema = z.object({
  message: z.string().openapi({
    example: "Book borrowed Successfull",
  }),
  catalog_id: id,
  borrowed_book_id: id,
})

export const returnBookRequestParams = z.object({
  book_id: z.string().openapi({
    example: "9f73c210-b417-409e-ac53-6cf4a0aa36c4",
    description: 'A Books ID'
  })
})
export const returnBookRequest = z.object({
  params: returnBookRequestParams,
});

export const returnBookResponseSchema = z.object({
  message: z.string().openapi({
    example: "Book Returned Successfull",
  }),
  catalog_id: id,
  returned_book_id: id,
})

// View Book
export const viewBooksSchema = z.object({
  id : id_opt.describe('Catalog ID'),
  title,
  author,
  isbn: isbn_opt,
  edition: edition_opt,
})

export const viewBooksFullSchema = z.object({
  id: id_opt.describe('Catalog ID'),
  title,
  author,
  isbn,
  edition,
  publisher,
  publication_year,
  category,
  total_copy: return_count.describe("Total number of book's duplicated copy in record"),
  available_copy: return_count.describe("Available number of book's copies")
})

export const DBBooksRequestParams = z.object({
  title: title_opt,
  author: author_opt,
  isbn: isbn_opt,
  edition: edition_opt,
  publisher: publisher_opt,
  publication_year: publication_year_opt,
  category: category_opt,
})
export const viewBooksRequestParams = DBBooksRequestParams.extend({
  donor_library_number: donor_library_number_opt,
  borrower_library_number: borrower_library_number_opt,
  book_status: book_status_opt,
  detailed: z.enum(['true', 'false']).default('false').openapi({
    description: "A more detailed response true or false"
  })
})

export const viewBooksRequest = z.object({
  query: viewBooksRequestParams
});

export const viewBooksFullResponseSchema = z.object({
  message: z.string().openapi({
    example: "More Detailed Books List",
  }),
  count: return_count.describe('Number of books available'),
  books: z.array(
    viewBooksFullSchema
  )
})

export const viewBooksResponseSchema = z.object({
  message: z.string().openapi({
    example: "Less Detailed Books List",
  }),
  count: return_count.describe('Number of books available'),
  books: z.array(
    viewBooksSchema
  )
})

export const viewBookRequestParams = z.object({
  catalog_id: id
})

export const viewBookRequest = z.object({
  params: viewBookRequestParams
});

export const viewBookSchema = z.object({
  message: z.string().openapi({
    example: "Books",
  }),
  catalog_id: id,
  total_number_of_book: z.number().openapi({
    example: 2
  }),
  available_number_of_book: z.number().openapi({
    example: 1
  }),
  title,
  author,
  isbn: isbn_opt,
  edition: edition_opt,
  publisher: publisher_opt,
  publication_year: publication_year_opt,
  category: category_opt,
  individual_books: z.array(
    z.object({
      id,
      donor_library_number: donor_library_number_opt,
      book_status
    })
  )
})

export const viewBookResponseSchema = viewBookSchema.extend({
  message: z.string().openapi({
    example: "Book details",
  }),
})

export type newBookSchemaType = z.infer<typeof newBookSchema>;
export type viewBooksFullRequestParamsType = z.infer<typeof viewBooksRequestParams>;
export type viewBooksResponseSchemaType = z.infer<typeof viewBooksResponseSchema | typeof viewBooksFullResponseSchema>;
