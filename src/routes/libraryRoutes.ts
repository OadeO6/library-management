import express from 'express';
import { addBook } from '../controllers/libraryControler';
import { newBookRequest } from '../schemas/librarySchemas';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateData } from '../middleware/validationMiddleware';

const libraryRouter = express.Router();

libraryRouter.post('/new', [authenticateToken, validateData(newBookRequest)], addBook);

export default libraryRouter;
