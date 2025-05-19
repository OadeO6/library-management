import express from 'express';
import { validateData } from '../../middleware/validationMiddleware';
import { userRegistrationSchema, userLoginSchema, userRegistrationRequest, userLoginRequest } from '../../schemas/userSchemas';

const userRouter = express.Router();

import { registerUser, loginUser } from './userController';

userRouter.post('/register', validateData(userRegistrationRequest), registerUser);
userRouter.post('/login', validateData(userLoginRequest), loginUser);

export default userRouter;
