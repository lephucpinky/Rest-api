import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

// export const generateToken = (userId: string, role: string): string => {
//   const token = jwt.sign({ userId, role }, 'admin', { expiresIn: '1h' });
//   return token;
// };

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
    // Add any additional data you want to include in the token payload
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
}

