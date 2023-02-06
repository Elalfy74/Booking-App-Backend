import createHttpError from "http-errors";
import Joi from "joi";

export const IsValidId = Joi.string().hex().length(24);

export const querySchema = Joi.object().keys({
  filter: Joi.object({
    id: Joi.array().items(IsValidId),
  }),

  range: Joi.array().items(Joi.number()).length(2),
  sort: Joi.array()
    .items(Joi.string().required(), Joi.string().valid("ASC", "DESC").required())
    .length(2),
  withCountry: Joi.boolean(),
});

export const featuredQuerySchema = querySchema.keys({
  filter: Joi.object({
    id: Joi.array().items(IsValidId),
    isFeatured: Joi.boolean(),
  }),
});

export const paramsSchema = Joi.object({
  id: IsValidId.required(),
});

export const ERRORS = {
  NOT_FOUND: (entity: ENTITES) => createHttpError.NotFound(`${entity} Not Found`),

  DUPLICATION: (entity: ENTITES, attribute: string) =>
    createHttpError.BadRequest(`${entity} With Same ${attribute} Already Exist`),
  MAX: (entity: ENTITES) =>
    `Featured ${entity} count are already at max, please unfeature one before adding new one`,
};

export const MESSAGES = {
  CREATED: (entity: ENTITES) => `Successfully Created ${entity}`,
  UPDATED: (entity: ENTITES) => `Successfully Updated ${entity}`,
  DELETED: (entity: ENTITES) => `Successfully DELETED ${entity}`,
};

export enum ENTITES {
  ROOM_CATEGORY = "Room Category",
  HOTEL_CATEGORY = "Hotel Category",
  ROOM_UNIT = "Room Unit",
  HOTEL = "Hotel",
  CITY = "City",
  COUNTRY = "Country",
}
