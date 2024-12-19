import { z } from "zod";
import {
  extendZodWithOpenApi,
} from "zod-openapi";
extendZodWithOpenApi(z);


const id = z.string().openapi({
  example: "9f73c210-b417-409e-ac53-6cf4a0aa36c4"
})
const title = z.string().openapi({
  description: "Book's Title",
  example: "Rich Dad Poor Dad",
})
const author = z.string().openapi({
  description: "Book's Author",
  example: "Bolanle Jhon",
})
const isbn = z.string().optional().openapi({
  description: "Book's ISBN number",
  example: "00bookisbnnum",
})
const count = z.number().min(1).optional().openapi({
  description: "Ammount of book to be added",
  example: 1,
})
const edition = z.string().optional().openapi({
  description: "Books's edition",
  example: "5th",
})
const publisher = z.string().optional().openapi({
  description: "Books's publisher",
  example: "Lison",
})
const publication_year = z.number().optional().openapi({
  description: "Books's publication year",
  example: 2024,
})
const category = z.array(z.string()).optional().openapi({
  description: "Books's publication year",
  example: ["technology", "literature"],
})
const donor_library_number = z.string().optional().openapi({
  description: "Library number of book donator",
  example: "LIB-012344",
})



// User registration schema
export const newBookSchema = z.object({
  title,
  author,
  isbn,
  count,
  edition,
  publisher,
  publication_year,
  category,
  donor_library_number,
})

export const newBookResponseSchema = z.object({
  message: z.string(),
  catalog_id: id,
  number_of_book_created: z.number().openapi({
    example: 1
  }),
  book_name: title,
  book_author: author,
  donor_library_number,
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

export type newBookSchemaType = z.infer<typeof newBookSchema>;
