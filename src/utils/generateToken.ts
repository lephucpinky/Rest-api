import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';


const secretKey =process.env.JWT_SECRET!;
export function generateToken(user: User) {

  return jwt.sign({user}, secretKey, {
    expiresIn: "1d",
  })
}

export const verifyToken =(requiredRole: any) =>(req: Request, res: Response, next: NextFunction) =>{
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err:jwt.VerifyErrors | null, decoded: any) => {
     if (err) {
      return res.status(401).json({ message: 'Invalid token' });
     }
     if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
     }

     req.user = decoded.user;
     if (decoded.role !== requiredRole) {
      return res.status(403).json({
          message: 'You do not have the authorization and permissions to access this resource.'
      });
  }
  })
}

