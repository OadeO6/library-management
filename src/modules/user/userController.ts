import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../../auth/util';
import { generatePasswordHash } from "../../auth/util";
import { generateLibraryNumber } from "../../utils/library";
import { z } from 'zod';
import { createUser, findUser } from '../../crud/db';
import { UserAlreadyExistsError } from '../../errors/db';
import { userloginResponseSchema, userRegistrationResponseSchema } from '../../schemas/userSchemas';
import { responseError } from '../../errors/utils';


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword = await generatePasswordHash(req.body.password);
    const libraryNumber = await generateLibraryNumber();

    // Create user
    const user = await createUser({
      ...req.body,
      password: hashedPassword,
      library_number: libraryNumber,
    });

    res.status(201).json(
      userRegistrationResponseSchema.parse({ message: "User registered successfully", user })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(responseError("Schema validation error", error));
      return;
    } else if (error instanceof UserAlreadyExistsError){
      res.status(409).json(responseError("User Already Exist Error", error));
      return;
    }
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // Find user
    const user = await findUser({ email: req.body.email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const passwordValid = await comparePassword(req.body.password, user.password)
    if (!passwordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generate JWT
    const token = await generateToken(user);

    res.status(200).json(
      userloginResponseSchema.parse({ message: "Login token generated successful", token })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Schema Validation error", details: error.errors });
    }
    res.status(500).json(responseError("Internal Server Error", error as Error));
  }
};
