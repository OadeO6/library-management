import express from 'express';
import { addBook, borrowBook, returnBook, viewBook, viewBooks } from './controler';
import { borrowBookRequest, newBookRequest, returnBookRequest, viewBookRequest, viewBooksRequest } from './schemas';
import { authenticateToken } from '../../middleware/authMiddleware';
import { validateData } from '../../middleware/validationMiddleware';

const libraryRouter = express.Router();

libraryRouter.post('/new', [authenticateToken, validateData(newBookRequest)], addBook);

libraryRouter.put('/borrow/:catalog_id', [authenticateToken, validateData(borrowBookRequest)], borrowBook);

libraryRouter.put('/return/:book_id', [authenticateToken, validateData(returnBookRequest)], returnBook);

libraryRouter.get('/books', [authenticateToken, validateData(viewBooksRequest)], viewBooks);

libraryRouter.get('/book/:catalog_id', [authenticateToken, validateData(viewBookRequest)], viewBook);

export default libraryRouter;
