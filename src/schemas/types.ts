import { Options } from "sequelize";
import { z } from "zod";
import {
  extendZodWithOpenApi,
} from "zod-openapi";
extendZodWithOpenApi(z);

export const numericString = z
.string()
.regex(/^\d+$/, {
  message: "Must contain only numeric characters",
})
.transform((value) => parseInt(value, 10))
.or(z.number())
.pipe(z.number());


export const ErrorSchema = z.array(
  z.object({
    message: z.string().openapi({
      description: "Individual Error Details",
      example: "Something went wrong",
    })
  })
);

export const ErrorResponseSchema = z.object({
  error: z.string(),
  details: ErrorSchema
});

export const nodeEnvironment = z.enum(['production', 'development', 'test']);

// types
export type numericStringType = z.infer<typeof numericString>;
export type nodeEnvironmentType = z.infer<typeof nodeEnvironment>;
export type ErrorSchemaType = z.infer<typeof ErrorSchema>;

export interface UserTokenData {
  id: string;
  email: string;
  library_number: string;
}

export interface findUserArgType {
  email: string;
}

export type ConfigOptionsType = Record<nodeEnvironmentType, Options>
