import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../auth/util";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token is required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeToken(token);
    (req as any).user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
