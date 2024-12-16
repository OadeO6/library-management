import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/env";

export const comparePassword = async (inputPassword, userPassword) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, userPassword);
  return isPasswordValid;
};

export const generatePasswordHash = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const generateToken = async (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  return token;
};

export const decodeToken = async (token) => {
  const data = jwt.verify(token, JWT_SECRET);
  return data;
}
