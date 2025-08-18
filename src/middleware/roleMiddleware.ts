import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Role from "../models/roleModel";

import { JWTPayload } from '../interfaces/types';


export const checkPermission = (permission: string) => {
  return async (req: Request & { user?: JWTPayload },  res: Response, next: NextFunction) => {
    
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.userId)
      .populate("roles")
      .populate("permissions");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const hasUserPermission = user.permissions.some(
      (perm: any) => perm.name === permission
    );
    if (hasUserPermission) {
      return next();
    }
 
    const rolePermissions = await Promise.all(
      user.roles.map(async (roleId: any) => {
        const role = await Role.findById(roleId).populate("permissions");
        return role?.permissions;
      })
    );

    const hasRolePermission = rolePermissions
      .flat()
      .some((perm: any) => perm.name === permission);

    if (hasRolePermission) {
      return next();
    }

    res.status(403).json({ message: "Permission denied" });
  };
};
