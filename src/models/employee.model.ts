import mongoose, { Document, Schema } from 'mongoose';

export interface Employee extends Document {
    name: string;
    position: string;
    office: string;
    salary: number;
}

const employeeSchema = new Schema<Employee>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  office: { type: String, required: true },
  salary: { type: Number, required: true }
});

export const EmployeeModel = mongoose.model<Employee>('Employee', employeeSchema);