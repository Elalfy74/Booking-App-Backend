import Joi from "joi";

export const addCitySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  photo: Joi.string().required(),
});
