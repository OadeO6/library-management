import { z } from "zod";
import {
  extendZodWithOpenApi,
} from "zod-openapi";
extendZodWithOpenApi(z);

// User registration schema
export const newBookSchema = z.object({
  title: z.string().openapi({
    description: "Book's Title",
    example: "Rich Dad Poor Dad",
  }),
  author: z.string().openapi({
    description: "Book's Author",
    example: "Bolanle Jhon",
  }),
  isbn: z.string().optional().openapi({
    description: "Book's ISBN number",
    example: "00bookisbnnum",
  }),
  count: z.number().min(1).optional().openapi({
    description: "Ammount of book to be added",
    example: 1,
  }),
  edition: z.string().optional().openapi({
    description: "Books's edition",
    example: "5th",
  }),
  publisher: z.string().optional().openapi({
    description: "Books's publisher",
    example: "Lison",
  }),
  publication_year: z.number().optional().openapi({
    description: "Books's publication year",
    example: 2024,
  }),
  category: z.array(z.string()).optional().openapi({
    description: "Books's publication year",
    example: ["technology", "literature"],
  }),
  donor_library_number: z.string().optional().openapi({
    description: "Library number of book donator",
    example: "LIB-012344",
  }),
})

export const newBookRequest = z.object({
  body: newBookSchema,
});

export type newBookSchemaType = z.infer<typeof newBookSchema>;
