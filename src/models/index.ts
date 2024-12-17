import  User  from "./User";
import  Catalog  from "./Catalog";
import  Book  from "./Book";

export const Models = [User, Catalog, Book]

// Associations //
// Catalog and Book: One-to-Many
Catalog.hasMany(Book, { foreignKey: "catalog_id", as: "books" });
Book.belongsTo(Catalog, { foreignKey: "catalog_id", as: "catalog" });

// Book and User: Donor and Borrower
User.hasMany(Book, { foreignKey: "donor_id", as: "donated_books" });
Book.belongsTo(User, { foreignKey: "donor_id", as: "donor" });

User.hasMany(Book, { foreignKey: "borrower_id", as: "borrowed_books" });
Book.belongsTo(User, { foreignKey: "borrower_id", as: "borrower" });

export { Catalog, User, Book };
