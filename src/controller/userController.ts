import { NextFunction, Request, Response } from "express";
let User = require("../models/userModel");


//load all nguoi dung
exports.allUsers = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const users = await User.find().sort({ createdAt: -1 }).select("-password");
        res.status(200).json({
          success: true,
          users,
        });
        next();
    } catch (error) {
        return next(error);
    }
};

//xem 1 nguoi dung
exports.singleUser = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.status(200).json({
          success: true,
          user,
        });
        next();
    } catch (error) {
        return next(error);
    }
};

//sua 1 nguoi dung
exports.editUser = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
    
        res.status(200).json({
          success: true,
          user,
        });
        next();
    } catch (error) {
        return next(error);
    }
};

//xoa 1 nguoi dung
exports.deleteUser = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const user = await User.deleteOne({ _id: req.params.id });
    
        res.status(200).json({
          success: true,
          message: "user deleted",
        });
        next();
    } catch (error) {
        return next(error);
    }
};
