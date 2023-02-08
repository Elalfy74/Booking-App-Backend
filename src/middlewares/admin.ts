import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { isAuth } from '.';

export default async (req: Request, res: Response, next: NextFunction) => {
  isAuth(req, res, () => {
    if (!req.isAdmin) return next(createHttpError.Unauthorized('Access denied'));
    next();
  });
};
