import createHttpError from 'http-errors';
import Joi from 'joi';
import { logger } from './logger';

export const IsValidId = Joi.string().hex().length(24);

export const querySchema = Joi.object().keys({
  filter: Joi.object({
    id: Joi.array().items(IsValidId),
  }),

  range: Joi.array().items(Joi.number()).length(2),
  sort: Joi.array()
    .items(Joi.string().required(), Joi.string().valid('ASC', 'DESC').required())
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

export class Utils {
  constructor(private entity: ENTITIES) {}

  NOT_FOUND() {
    logger.error(`${this.entity} Not Found`);
    return createHttpError.NotFound(`${this.entity} Not Found`);
  }

  DUPLICATION(attribute: string) {
    logger.error(`${this.entity} With Same ${attribute} Already Exist`);
    return createHttpError.BadRequest(`${this.entity} With Same ${attribute} Already Exist`);
  }

  MAX() {
    logger.error(
      `Featured ${this.entity} count are already at max, please unfeature one before adding new one`
    );
    return createHttpError.BadRequest(
      `Featured ${this.entity} count are already at max, please unfeature one before adding new one`
    );
  }

  CREATED() {
    logger.info(`Successfully Created ${this.entity}`);
    return `Successfully Created ${this.entity}`;
  }
  UPDATED() {
    logger.info(`Successfully Updated ${this.entity}`);
    return `Successfully Updated ${this.entity}`;
  }
  DELETED() {
    logger.info(`Successfully DELETED ${this.entity}`);
    return `Successfully DELETED ${this.entity}`;
  }
}

export enum ENTITIES {
  ROOM_CATEGORY = 'Room Category',
  HOTEL_CATEGORY = 'Hotel Category',
  ROOM_UNIT = 'Room Unit',
  HOTEL = 'Hotel',
  CITY = 'City',
  COUNTRY = 'Country',
}

// export const ERRORS = {
//   NOT_FOUND: (entity: ENTITES) => {
//     logger.error(`${entity} Not Found`);
//     return createHttpError.NotFound(`${entity} Not Found`);
//   },

//   DUPLICATION: (entity: ENTITES, attribute: string) => {
//     logger.error(`${entity} With Same ${attribute} Already Exist`);
//     return createHttpError.BadRequest(`${entity} With Same ${attribute} Already Exist`);
//   },

//   MAX: (entity: ENTITES) => {
//     logger.error(
//       `Featured ${entity} count are already at max, please unfeature one before adding new one`
//     );
//     return createHttpError.BadRequest(
//       `Featured ${entity} count are already at max, please unfeature one before adding new one`
//     );
//   },
// };

// export const MESSAGES = {
//   CREATED: (entity: ENTITES) => {
//     logger.info(`Successfully Created ${entity}`);
//     return `Successfully Created ${entity}`;
//   },
//   UPDATED: (entity: ENTITES) => {
//     logger.info(`Successfully Updated ${entity}`);
//     return `Successfully Updated ${entity}`;
//   },
//   DELETED: (entity: ENTITES) => {
//     logger.info(`Successfully DELETED ${entity}`);
//     return `Successfully DELETED ${entity}`;
//   },
// };
