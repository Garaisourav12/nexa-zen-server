import CreateUserDto from '../dto/CreateUserDto';
import LoginUserDto from '../dto/LoginUserDto';
import { createError } from '../middlewares/errorHandler';
import User from '../models/userModel';
import { IUserResponse } from '../types';
import { comparePassword, hashPassword } from '../utils/hashUtil';
import { generateToken } from '../utils/jwtUtil';

const registerUser = async (data: CreateUserDto): Promise<IUserResponse> => {
  const { email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ email, password: hashedPassword });

  const response: IUserResponse = {
    id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return response;
};

const loginUser = async (
  data: LoginUserDto,
): Promise<{ user: IUserResponse; token: string }> => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = generateToken({ userId: user._id });

  const response: IUserResponse = {
    id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: response, token };
};

const getMyProfile = async (userId: string): Promise<IUserResponse> => {
  const user = await User.findById(userId);
  if (!user) throw createError('User not found', 404);
  const response: IUserResponse = {
    id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return response;
};

export { getMyProfile, loginUser, registerUser };
