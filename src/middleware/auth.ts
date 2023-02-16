import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { verifyAccessToken } from '../utils/jwt-helper';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { JWT_TOKEN } = req.cookies as {
    JWT_TOKEN: string;
  };

  if (!JWT_TOKEN) return next(createHttpError.Unauthorized('Access deniend , No Token'));

  try {
    const decodedToken = verifyAccessToken(JWT_TOKEN);

    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin;
    next();
  } catch (err) {
    return next(createHttpError.Unauthorized('Invalid Token'));
  }
};
