// import { Sequelize } from "sequelize";
import { ConfigOptionsType } from "../schemas/types";
import { NODE_ENV, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRESQL_DB, POSTGRESQL_USER } from "./env";

export const CONFIG: ConfigOptionsType = {
  "development": {
    "username": POSTGRESQL_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRESQL_DB,
    "host": POSTGRES_HOST,
    "dialect": "postgres",
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "test": {
    "username": POSTGRESQL_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRESQL_DB,
    "host": POSTGRES_HOST,
    "dialect": "postgres",
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "production": {
    "username": POSTGRESQL_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRESQL_DB,
    "host": POSTGRES_HOST,
    "dialect": "postgres",
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  }
}

export const DB_CONFIG = CONFIG[NODE_ENV];
