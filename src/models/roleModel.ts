import mongoose, { Schema } from 'mongoose';
import { IRole } from '../interfaces/types';

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
}, { timestamps: true });

export default mongoose.model<IRole>('Role', roleSchema);