import { DataTypes, Model, CreationOptional,InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../connections/db";


class Catalog extends Model<InferAttributes<Catalog>, InferCreationAttributes<Catalog>> {
  public id!: CreationOptional<string>;
  public title!: string;
  public author!: string;
  public isbn?: string;
  public total_copy!: CreationOptional<number>;
  public available_copy!: CreationOptional<number>;
  public edition?: CreationOptional<string>;
  public publisher?: CreationOptional<string>;
  public publication_year?: CreationOptional<number>;
  public category!: string[];
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
    isbn: {
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
        DataTypes.STRING
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
