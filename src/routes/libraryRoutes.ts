import express from 'express';
import { addBook, borrowBook, returnBook } from '../controllers/libraryControler';
import { borrowBookRequest, newBookRequest, returnBookRequest } from '../schemas/librarySchemas';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateData } from '../middleware/validationMiddleware';

const libraryRouter = express.Router();

libraryRouter.post('/new', [authenticateToken, validateData(newBookRequest)], addBook);

libraryRouter.put('/borrow/:catalog_id', [authenticateToken, validateData(borrowBookRequest)], borrowBook);

libraryRouter.put('/return/:book_id', [authenticateToken, validateData(returnBookRequest)], returnBook);

export default libraryRouter;
