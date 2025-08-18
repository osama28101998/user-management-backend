import mongoose, { Schema } from 'mongoose';
import { IPermission } from '../interfaces/types';

const permissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model<IPermission>('Permission', permissionSchema);