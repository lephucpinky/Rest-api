import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { verifyToken } from '../utils/generateToken';

export const middleWareToken = {
    //verifytoken
    verifyToken: (req: Request, res:Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'Access denied' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();

        } catch (error) {
            res.status(400).send({ message: 'Invalid token' });
        }
    }
}