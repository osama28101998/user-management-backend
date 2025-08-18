import jwt from "jsonwebtoken";
import { JWTPayload } from "../interfaces/types";

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
};
