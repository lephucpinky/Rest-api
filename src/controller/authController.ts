
import { NextFunction, Request, Response } from "express";
import { IUserDocument } from "../types/IUser";


let User = require("../models/userModel");
let errorResponse = require("../utils/errorResponse");




exports.register = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new errorResponse("E-mail đã được đăng kí", 400));
    }
    try {
      req.body.role = "user"; // ngăn chặn bất kỳ ai tạo admin user.
      req.body.active = false; // ngăn chặn bất kỳ ai kích hoạt  user.
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
}

exports.login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        //xác nhận
        if(!email){
            return next(new errorResponse("hãy thêm email", 403))
        }
        if(!password){
            return next(new errorResponse("hãy thêm mật khẩu", 403))
        }
        // kiểm tra email user
        const user = await User.findOne({email});
        if(!user){
            return next(new errorResponse("Thông tin xác thực không hợp lệ", 400));
        }
        // kiểm tra mật khẩu 
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return next(new errorResponse("Thông tin xác thực không hợp lệ", 400))
        }
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error)
        


    }
}

interface TokenOptions {
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
}



const sendTokenResponse = async (
    user: IUserDocument,
    codeStatus: number,
    res: any
) => {
    const token = await user.getJwtToken();
    const options: TokenOptions = { maxAge: 60 * 60 * 1000, httpOnly: true };
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }
    res.status(codeStatus).cookie("token", token, options).json({
        success: true,
        role: user.role,
    })
}


//log out
exports.logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};