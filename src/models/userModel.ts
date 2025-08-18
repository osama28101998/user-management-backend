import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/types';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }], 
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);