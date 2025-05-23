import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../config/db";

const sequelize = new Sequelize({
  ...DB_CONFIG,
  logging: true,
});

export const connectDB = async () => {
  try {
    sequelize.sync()
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

export default sequelize;
