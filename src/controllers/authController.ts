import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { generateToken } from '../utils/jwt';
import { body, validationResult } from 'express-validator';

export const login = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken({ userId: user._id.toString(), username: user.username });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];

export const register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("🚀 ~ req.body:", req.body)
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = generateToken({ userId: user._id.toString(), username: user.username });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};