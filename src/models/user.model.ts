import mongoose, { Document, Schema } from 'mongoose';

// Define user schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'employee' 
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], default: 'admin' }, // Default role is 'customer'
});

// Define and export the User model
export const UserModel = mongoose.model<User>('User', userSchema);