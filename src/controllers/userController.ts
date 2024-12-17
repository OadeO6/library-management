import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../auth/util';
import { generatePasswordHash } from "../auth/util";
import { generateLibraryNumber } from "../utils/library";
import { z } from 'zod';
import { createUser, findUser } from '../crud/db';
import { UserAlreadyExistsError } from '../errors/db';


export const registerUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await generatePasswordHash(req.body.password);
    const libraryNumber = await generateLibraryNumber();

    // Create user
    const user = await createUser({
      ...req.body,
      password: hashedPassword,
      library_number: libraryNumber,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else if (error instanceof UserAlreadyExistsError){
      return res.status(409).json({ errors: error.message });
    }
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Find user
    const user = await findUser({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordValid = await comparePassword(req.body.password, user.password)
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = await generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
