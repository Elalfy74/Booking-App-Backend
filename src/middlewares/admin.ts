import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAdmin) throw createHttpError.Unauthorized("Access denied");

  next();
};
