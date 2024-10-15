let errorResponse = require("../utils/errorResponse");
import { NextFunction, Request, Response } from "express";
let jwt = require("jsonwebtoken");
import { IUser } from "../types/IUser";
let User = require("../models/userModel");

export interface CustomRequest extends Request {
  user?: IUser;
}

interface DecodedToken {
  id: string;
}

//check if user is authenticated
exports.isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  // đảm bảo token tồn tại
  if (!token) {
    return next(new errorResponse("bạn phải đăng nhập!", 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new errorResponse("bạn phải đăng nhập!", 401));
  }
};

//middleware for admin
exports.isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "user") {
    return next(new errorResponse("Truy cập bị từ chối, bạn phải là  Admin", 401));
  }
  next();
};