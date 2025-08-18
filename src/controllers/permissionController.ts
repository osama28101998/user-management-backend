import { Request, Response } from "express";
import Permission from "../models/permissionModel";
import { body, validationResult } from "express-validator";

export const createPermission = [
  body("name").notEmpty().withMessage("Permission name is required"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      const permission = new Permission({ name, description });
      await permission.save();
      res.status(201).json(permission);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPermissionById = async (req: Request, res: Response) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.json({ message: "Permission deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
