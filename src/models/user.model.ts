import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from "bcrypt";

// Define user schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  role: 'admin' | 'employee' ;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee']}, 
});

userSchema.pre<User>("save", async function (next) {
  const user = this;
  if(!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
})
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};


// Define and export the User model
export const UserModel = mongoose.model<User>('User', userSchema) ;