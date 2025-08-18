import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JWTPayload } from "../interfaces/types";

export const authMiddleware = (
  req: Request & { user?: JWTPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload: JWTPayload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
