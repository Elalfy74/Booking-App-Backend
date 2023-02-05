import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { QueryFields } from "../types/types";

export type FindFilter = {
  _id?: {
    $in: string[];
  };
  isFeatured?: boolean;
};

export default (req: Request, res: Response, next: NextFunction) => {
  const { filter }: QueryFields = req.query;

  const findFilter: FindFilter = {};

  if (!filter || _.isEmpty(filter)) return next();

  if (filter.id) {
    findFilter._id = { $in: filter.id };
  }

  if (Boolean(filter.isFeatured)) {
    findFilter.isFeatured = filter.isFeatured;
  }

  req.findFilter = findFilter;
  next();
};
