import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.string().default("3000").transform((val) => {
    const num = Number(val);
    if (isNaN(num)) {
      throw new Error("Invalid number");
    }
    return num;
  }),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  POSTGRESQL_PORT: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) {
      throw new Error("Invalid number");
    }
    return num;
  }),
  POSTGRESQL_DB: z.string(),
  POSTGRESQL_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_HOST: z.string()
});

const env = EnvSchema.parse(process.env);

export const {
  PORT,
  POSTGRESQL_PORT,
  POSTGRESQL_DB,
  POSTGRESQL_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  JWT_SECRET,
  NODE_ENV
} = env;
