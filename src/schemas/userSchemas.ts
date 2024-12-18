import { z } from "zod";
import {
  extendZodWithOpenApi,
} from "zod-openapi";
extendZodWithOpenApi(z);

const first_name = z.string().min(1).max(50).openapi({
  description: "User's First Name.",
  example: "Ade",
});
const last_name = z.string().min(1).max(50).openapi({
  description: "User's Last Name",
  example: "Kunle",
});
const email = z.string().email().openapi({
  description: "User's email",
  example: "user@example.com",
});
const password = z.string().min(8).openapi({
  description: "User's password",
  example: "mypassword",
});
const phone_number = z.string().optional().openapi({
  description: "User's Phone Number",
  example: "09011111111",
})
const library_number = z.string().optional().openapi({
  description: "User's Library Number",
  example: "LIB-1022",
})

// User registration schema
export const userRegistrationSchema = z.object({
  first_name,
  last_name,
  email,
  password,
  phone_number,
})


export const userRegistrationResponseSchema = z.object({
  message: z.string().openapi({
    example: "Registration Successfull",
  }),
  user: z.object({
    first_name,
    last_name,
    library_number,
    email,
    phone_number,
  })
})

export const userRegistrationRequest = z.object({
  body: userRegistrationSchema,
});

export const userLoginSchema = z.object({
  email,
  password,
});

export const userloginResponseSchema = z.object({
  message: z.string().openapi({
    example: "Login Successfull",
  }),
  token: z.string()
})

export const userLoginRequest = z.object({
  body: userLoginSchema,
});

export type userRegistration = z.infer<typeof userRegistrationSchema>;
export type userLogin = z.infer<typeof userLoginSchema>;
