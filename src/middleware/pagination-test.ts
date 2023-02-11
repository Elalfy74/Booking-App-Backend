import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { QueryFields } from '../types/types';

export default async (req: Request, res: Response, next: NextFunction, Model: Model<any>) => {
  const { range }: QueryFields = req.query;

  if (!range) return next();

  const [page, limit] = range;

  const startIndex = (page - 1) * limit;

  const count = await Model.count();

  res.setHeader('Content-Range', count);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

  req.startIndex = startIndex;
  req.limit = limit;

  next();
};
