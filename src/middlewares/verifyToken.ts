import { NextFunction, Request, Response } from 'express';
import { verifyToken as verifyJWTToken } from '../utils/jwtUtil';
import { createError } from './errorHandler';

const verifyToken = (req: Request, _: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token; // Token from cookie

    if (!token) {
      throw createError('Token not found', 401);
    }

    const user: any = verifyJWTToken(token);

    if (!user) {
      throw createError('Invalid token', 401);
    }

    // @ts-ignore
    req.userId = user.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
