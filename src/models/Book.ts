import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../connections/db";

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  public id!: string;
  public catalog_id!: string;
  public status!: "borrowed" | "available" | "lost";
  public donor_id?: string; // References user id
  public borrower_id?: string; // References user id
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    catalog_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("borrowed", "available", "lost"),
      allowNull: false,
    },
    donor_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    borrower_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "books",
  }
);

export default Book;
