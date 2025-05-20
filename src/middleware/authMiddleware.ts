import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../auth/util";
import { UserTokenData } from "../types";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token is required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded: UserTokenData = await decodeToken(token);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
