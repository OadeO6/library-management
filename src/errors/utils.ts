import { ZodError } from "zod";
import { ErrorSchemaType } from "../schemas/types";

export const responseError = (message: string, error: ZodError | Error | null = null) => {
  let errorMessages: ErrorSchemaType = [];
  if (error) {
    if (error instanceof ZodError) {
      errorMessages = error.errors.map((issue: any) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }))
    } else if ((error as ZodError).errors) {
      errorMessages = (error as ZodError).errors.map((issue: any) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }))
    } else {
      errorMessages = [{message: error.message}];
    }
  }
  return { error: message, details: errorMessages }
}
