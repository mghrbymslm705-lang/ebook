import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(user: { id: string; username: string; role: Role }): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}