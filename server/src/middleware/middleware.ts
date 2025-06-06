import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_ACCESS_TOKEN } from "../config/config";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // const token = req.cookies?.refreshToken; // TODO: should ideally authenticate using accessToken but since there is no frontend I'm using refreshToken
  // if (!token) {
  //   res.status(401).json({ message: "Not authorized" });
  //   return;
  // }

  try {
    // const decoded = jwt.verify(token, JWT_SECRET_ACCESS_TOKEN) as { userId: string };
    // req.user!.id = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export default authMiddleware;