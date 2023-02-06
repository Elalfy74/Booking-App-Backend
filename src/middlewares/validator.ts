import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ObjectSchema } from "joi";

export type ValidatorParams = {
  bodySchema?: ObjectSchema<any>;
  querySchema?: ObjectSchema<any>;
  paramsSchema?: ObjectSchema<any>;
};

export default (validatorParams: ValidatorParams) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { bodySchema, querySchema, paramsSchema } = validatorParams;

    const body = req.body;
    const query = req.query as any;
    const params = req.params;

    if (bodySchema) {
      const { error } = bodySchema.validate(body);
      if (error) throw createError.BadRequest(error.details[0].message);
    }

    if (querySchema) {
      // parse the query params
      console.log("From Validator", query);
      for (const q in query) {
        try {
          if (typeof query[q] === "object") break;

          query[q] = JSON.parse(query[q] as string);
        } catch (err) {
          return next(createError.BadRequest(`Invalid Query Params Type'${q}'`));
        }
      }

      const { error } = querySchema.validate(query);
      if (error) throw createError.BadRequest(error.details[0].message);
    }

    if (paramsSchema) {
      const { error } = paramsSchema.validate(params);
      if (error) throw createError.BadRequest(error.details[0].message);
    }

    next();
  };
};
