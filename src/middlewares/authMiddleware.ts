import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Access denied for this request" });
  try {
    const decodedData = (await jwt.verify(token, JWT_SECRET)) as {
      userId: String;
    };
    const userData = await User.findById(decodedData.userId);
    if (!userData)
      res.status(500).json({ error: "Unauthorised to access this resource" });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
