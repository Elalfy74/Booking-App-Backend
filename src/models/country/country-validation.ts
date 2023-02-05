import Joi from "joi";

export const addCountrySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  photo: Joi.string().required(),
  isFeatured: Joi.boolean(),
});

export const updateCountrySchema = Joi.object({
  name: Joi.string().min(2).max(50),
  photo: Joi.string(),
  isFeatured: Joi.boolean(),
});
