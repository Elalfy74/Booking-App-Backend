import config from "config";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  const { JWT_TOKEN } = req.cookies as {
    JWT_TOKEN: string;
  };

  if (!authHeader && !JWT_TOKEN)
    throw createHttpError.Unauthorized("Access deniend , No Token");

  const token = authHeader?.split(" ")[1] || JWT_TOKEN;

  const decodedToken = verify(token, config.get("tokenKey")) as {
    userId: string;
    isAdmin: boolean;
  };

  if (!decodedToken) throw createHttpError.Unauthorized("Invalid Token");

  req.userId = decodedToken.userId;
  req.isAdmin = decodedToken.isAdmin;
  next();
};
