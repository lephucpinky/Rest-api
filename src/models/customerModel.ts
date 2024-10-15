import mongoose, { Schema } from "mongoose";
import { ICustomer } from "../types/ICustomer";


const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, "bắt buộc có tên"],
    },

    email: {
      type: String,
      required: [true, "bắt buộc có email "],
    },

    phoneNumber: {
      type: String,
    },

    address: {
      type: String,
      required: true
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model<ICustomer>("Customer", customerSchema);