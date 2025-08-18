import { Request, Response } from "express";
import User from "../models/userModel";
import Role from "../models/roleModel";
import Permission from "../models/permissionModel";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const createUser = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, roles } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        roles,
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("roles").populate("permissions");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("roles")
      .populate("permissions");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const assignRoleToUser = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or Role not found" });
    }

    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const assignPermissionToUser = async (req: Request, res: Response) => {
  try {
    const { userId, permissionId } = req.body;
    const user = await User.findById(userId);
    const permission = await Permission.findById(permissionId);

    if (!user || !permission) {
      return res.status(404).json({ message: "User or Permission not found" });
    }

    if (!user.permissions.includes(permissionId)) {
      user.permissions.push(permissionId);
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
