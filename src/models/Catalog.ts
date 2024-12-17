import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../connections/db";

class Catalog extends Model<InferAttributes<Catalog>, InferCreationAttributes<Catalog>> {
  public id!: string;
  public title!: string;
  public author!: string;
  public ISBN?: string;
  public total_copy!: number;
  public available_copy!: number;
  public edition?: string;
  public publisher?: string;
  public publication_year?: number;
  public category!: string[]; // Enum list
}

Catalog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_copy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    available_copy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM("technology", "art") // Enum values
      ),
      defaultValue: [],
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "catalogs",
  }
);

export default Catalog;
