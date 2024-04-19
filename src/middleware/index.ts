
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await UserModel.findById((decoded as any).userId);
    if (!user) {
      throw new Error('User not found!');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(403).json({ message: 'Forbidden' });
  }
}
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    return res.status(403).send({ error: 'Unauthorized access!' });
  }
  next();
};

