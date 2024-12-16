import { z } from "zod";
import * as yaml from "yaml";
import {
  extendZodWithOpenApi,
  createDocument
} from "zod-openapi";
extendZodWithOpenApi(z);

// User registration schema
export const userRegistrationSchema = z.object({
  first_name: z.string().min(1).max(50).openapi({
    description: "User's First Name.",
    example: "Ade",
  }),
  last_name: z.string().min(1).max(50).openapi({
    description: "User's Last Name",
    example: "Kunle",
  }),
  email: z.string().email().openapi({
    description: "User's email",
    example: "user@example.com",
  }),
  password: z.string().min(8).openapi({
    description: "User's password",
    example: "mypassword",
  }),
  phone_number: z.string().optional().openapi({
    description: "User's PhoneNumber",
    example: "09011111111",
  }),
})

export const userRegistrationRequest = z.object({
  body: userRegistrationSchema,
});

export const userLoginSchema = z.object({
  email: z.string().email().openapi({
    description: "User's email",
    example: "user@example.com",
  }),
  password: z.string().min(8).openapi({
    description: "User's password",
    example: "mypassword",
  }),
});

export const userLoginRequest = z.object({
  body: userLoginSchema,
});

export type userRegistration = z.infer<typeof userRegistrationSchema>;
export type userLogin = z.infer<typeof userLoginSchema>;
