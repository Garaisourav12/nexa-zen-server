import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payload: object,
  expiresIn: SignOptions['expiresIn'] = '1d',
): string => {
  const secret: Secret = process.env.JWT_SECRET as string;
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): string | JwtPayload => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret);
};
