import { Request, Response, NextFunction } from "express";
import { QueryFields } from "../types/types";

export default (req: Request, res: Response, next: NextFunction) => {
  const { sort }: QueryFields = req.query;

  if (!sort) return next();

  if (sort[0] === "id") {
    req.sort = { _id: sort[1] };
  } else {
    req.sort = { [sort[0]]: sort[1] };
  }

  next();
};
