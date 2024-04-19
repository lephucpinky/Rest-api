import mongoose, { Document, Schema } from 'mongoose';

export interface Employee extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

const employeeSchema = new Schema<Employee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const EmployeeModel = mongoose.model<Employee>('Employee', employeeSchema);