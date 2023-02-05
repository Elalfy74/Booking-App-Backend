import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { object, ObjectSchema } from "joi";

export default (
  bodySchema: ObjectSchema<any> | null,
  querySchema?: ObjectSchema<any> | null
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const query = req.query as any;

    if (bodySchema) {
      const { error } = bodySchema.validate(body);
      if (error) throw createError.BadRequest(error.details[0].message);
    }

    if (querySchema) {
      // parse the query params
      console.log("From Validator", query);
      for (let q in query) {
        try {
          if (typeof query[q] === "object") break;

          query[q] = JSON.parse(query[q] as string);
        } catch (err) {
          return next(
            createError.BadRequest(`Invalid Query Params Type'${q}'`)
          );
        }
      }

      const { error } = querySchema.validate(query);
      if (error) throw createError.BadRequest(error.details[0].message);
    }

    next();
  };
};
