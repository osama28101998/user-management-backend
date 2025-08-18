import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  roles: Types.ObjectId[];
  permissions: Types.ObjectId[];
}

export interface IRole {
  _id?: Types.ObjectId;
  name: string;
  permissions: Types.ObjectId[];
}

export interface IPermission {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
}

export interface JWTPayload {
  userId: string;
  username?: string;
}