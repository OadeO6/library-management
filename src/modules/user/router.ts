import express from 'express';
import { validateData } from '../../middleware/validationMiddleware';
import { userRegistrationSchema, userLoginSchema, userRegistrationRequest, userLoginRequest } from './schemas';

const userRouter = express.Router();

import { registerUser, loginUser } from './controler';

userRouter.post('/register', validateData(userRegistrationRequest), registerUser);
userRouter.post('/login', validateData(userLoginRequest), loginUser);

export default userRouter;
