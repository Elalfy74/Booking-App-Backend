import Joi from "joi";

import { IsValidId } from "../../utils/utils";

export const addCitySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  country: IsValidId.required(),
  photos: Joi.array().items(Joi.string()).min(1).required(),
  isFeatured: Joi.boolean(),
});

export const updateCitySchema = Joi.object()
  .keys({
    name: Joi.string().min(2).max(50),
    country: IsValidId,
    photos: Joi.array().items(Joi.string()).min(1),
    isFeatured: Joi.boolean(),
  })
  .min(1);
