import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

import { filter, sort } from '.';
import pagination from './pagination-test';

export default (Model: Model<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    filter(req, res, () => {
      pagination(
        req,
        res,
        () => {
          sort(req, res, next);
        },
        Model
      );
    });
  };
};
