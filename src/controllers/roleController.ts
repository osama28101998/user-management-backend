import { Request, Response } from 'express';
import Role from '../models/roleModel';
import Permission from '../models/permissionModel';
import { body, validationResult } from 'express-validator';
 
export const createRole = [
  body('name').notEmpty().withMessage('Role name is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, permissions } = req.body;
      const role = new Role({ name, permissions });
      await role.save();
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await Role.findById(req.params.id).populate('permissions');
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
 
export const assignPermissionToRole = async (req: Request, res: Response) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Role.findById(roleId);
    const permission = await Permission.findById(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ message: 'Role or Permission not found' });
    }

    if (!role.permissions.includes(permissionId)) {
      role.permissions.push(permissionId);
      await role.save();
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};