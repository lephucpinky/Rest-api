import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/IUser";
import bcrypt from "bcryptjs";
let jwt = require("jsonwebtoken");


const userSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "bắt buộc  có họ"],
      maxLength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "bắt buộc có tên"],
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "bắt buộc có email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng thêm một email hợp lệ",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "bắt buộc có mật khẩu"],
      minLength: [6, "Mật khẩu phải có ít nhất (6) ký tự"],
    },

    role: {
      type: String,
      default: "user",
    },

  },
  { timestamps: true }
);

//mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// so sánh mật khẩu người dùng
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });
};



module.exports = mongoose.model<IUserDocument>("User", userSchema);