
import express, { NextFunction, Request, Response } from 'express';

import { User, UserModel } from '../models/user.model';
import { generateToken } from '../utils/generateToken';




export const register = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Please, send your email and password" });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: "The user already exists" });
    }
    const newUser = new UserModel(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}

export const login = async (req: express.Request, res: express.Response) => {
    if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Please, send your email and password" });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exist" });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({ token: generateToken(user) });
    }

}