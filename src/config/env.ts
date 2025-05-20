import { z } from "zod";
import { nodeEnvironment, numericString } from "../types";

const EnvSchema = z.object({
  PORT: numericString.default("3000"),
  JWT_SECRET: z.string(),
  NODE_ENV: nodeEnvironment.default("development"),
  POSTGRESQL_PORT: numericString,
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
