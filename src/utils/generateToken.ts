import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';


const secretKey =process.env.JWT_SECRET!;
export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    secretKey,
    {expiresIn:"2h"}
  )
}

export const verifyToken = (token: string): any => {
  try {
      return jwt.verify(token, secretKey);
  } catch (error) {
      throw new Error('Invalid token');
  }
};



