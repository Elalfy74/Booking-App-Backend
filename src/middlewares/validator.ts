import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ObjectSchema } from "joi";

const validator = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) throw createError.BadRequest(error.details[0].message);

    next();
  };
};

export default validator;
