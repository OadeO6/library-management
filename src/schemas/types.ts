import { z } from "zod";


export const numericString = z.string().regex(/^\d+$/, {
  message: "Must contain only numeric characters",
});
export const nodeEnvironment = z.enum(['production', 'development', 'test']);

// types
export type numericStringType = z.infer<typeof numericString>;
export type nodeEnvironmentType = z.infer<typeof nodeEnvironment>;

export interface UserTokenData {
  id: string;
  email: string;
  library_number: string;
}

export interface findUserArgType {
  email: string;
}
