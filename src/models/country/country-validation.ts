import Joi from "joi";

const commonSchema = {
  name: Joi.string().min(2).max(50),
  photo: Joi.string(),
  isFeatured: Joi.boolean(),
};

export const addCountrySchema = Joi.object({
  name: commonSchema.name.required(),
  photo: commonSchema.photo.required(),
  isFeatured: commonSchema.isFeatured,
});

export const updateCountrySchema = Joi.object({
  name: commonSchema.name,
  photo: commonSchema.photo,
  isFeatured: commonSchema.isFeatured,
});
