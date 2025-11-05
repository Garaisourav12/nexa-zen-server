import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import CreateUserDto from '../dto/CreateUserDto';
import LoginUserDto from '../dto/LoginUserDto';
import { createError } from '../middlewares/errorHandler';
import { authServices } from '../services';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = plainToInstance(CreateUserDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      // ✅ Throw only the first validation message
      const firstError = Object.values(errors[0].constraints ?? {})[0];
      throw createError(firstError || 'Bad request', 400);
    }

    const response = await authServices.registerUser(dto);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: response,
    });
  } catch (error) {
    next(error); // ✅ send to global error handler
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = plainToInstance(LoginUserDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const firstError = Object.values(errors[0].constraints ?? {})[0];
      throw createError(firstError || 'Bad request', 400);
    }

    const { user, token } = await authServices.loginUser(dto);

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .json({
        success: true,
        message: 'Login successful',
        token,
        user,
      });
  } catch (error) {
    next(error); // ✅ pass to global error handler
  }
};

const logoutUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ success: true, message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const user = await authServices.getMyProfile(userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export { getMyProfile, loginUser, logoutUser, registerUser };
