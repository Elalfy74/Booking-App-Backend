import createHttpError from "http-errors";
import Joi from "joi";

export const IsValidId = Joi.string().hex().length(24);

export const getQuerySchema = Joi.object({
  filter: Joi.object({
    id: Joi.array().items(Joi.string()),
    isFeatured: Joi.boolean(),
  }),

  range: Joi.array().items(Joi.number()).length(2),
  sort: Joi.array()
    .items(
      Joi.string().required(),
      Joi.string().valid("ASC", "DESC").required()
    )
    .length(2),
  withCountry: Joi.boolean(),
});

export const ERRORS = {
  NOT_FOUND: (entity: ENTITES) =>
    createHttpError.NotFound(`${entity} Not Found`),

  DUPLICATION: (entity: ENTITES, attribute: string) =>
    createHttpError.BadRequest(
      `${entity} With Same ${attribute} Already Exist`
    ),
  MAX: (entity: ENTITES) =>
    `Featured ${entity} count are already at max, please unfeature one before adding new one`,
  EMPTY: createHttpError.BadRequest(
    "Please provide at least one new attribute"
  ),
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
