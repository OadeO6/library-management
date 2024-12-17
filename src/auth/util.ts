import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/env";
import { User } from "../models";
import { UserTokenData } from "../schemas/types";

export const comparePassword = async (inputPassword: string, userPassword: string) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, userPassword);
  return isPasswordValid;
};

export const generatePasswordHash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const generateToken = async (user: User) => {
  const payload: UserTokenData = {
    id: user.id, email: user.email,
    library_number: user.library_number
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: "12h" }
  );
  return token;
};

export const decodeToken = async (token: string): Promise<UserTokenData> => {
  const data = jwt.verify(token, JWT_SECRET) as UserTokenData;
  return data;
}
