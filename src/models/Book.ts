import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../connections/db";

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  public id!: CreationOptional<string>;
  public catalog_id!: string;
  public status!: CreationOptional<"borrowed" | "available" | "lost">;
  public donor_id?: CreationOptional<string>; // References user id
  public borrower_id?: CreationOptional<string | null>; // References user id
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
      defaultValue: "available",
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
