import { Request, Response, Application } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

// user registration
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, username, password } = req.body;
  try {
    if (!name || !username || !password)
      return res
        .status(400)
        .json({ error: "Please provide name, username, and password" });

    const userData = await User.findOne({ username });
    if (userData)
      return res.status(500).json({
        error: "This username is already exists, try with another one",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, username, password: hashPassword });

    res.status(200).json({ message: "User registered successfull.", user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// user login
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Please enter username or password" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ username, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
