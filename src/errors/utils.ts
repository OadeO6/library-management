import { ZodError } from "zod";

export const constructError = (message: string, details: ZodError | Error) => {
    // const errorMessages = typeof details is tupl ? details.errors.map((issue: any) => ({
    //   message: `${issue.path.join('.')} is ${issue.message}`,
    // })) : [details];
  return { error: message, details }
}
