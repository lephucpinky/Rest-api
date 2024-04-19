

import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }  
        if(email === 'admin@example.com' && password === '111111'){
            setTimeout(() => {
                res.json({ token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIxNTgwOTY2MjA4OGY2MjEyYzlhNGQiLCJpYXQiOjE3MTM0NjMwODR9.OWEervieTq_3B3aj8tQ6dzTHxmuryhazRNwKhxYqtco'});
            }, 2000);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}