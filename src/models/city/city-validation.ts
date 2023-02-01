import Joi from "joi";

const commonSchema = {
  name: Joi.string().min(2).max(50),
  country: Joi.string().min(2).max(100),
  photos: Joi.array().min(1),
  isFeatured: Joi.boolean(),
};

export const addCitySchema = Joi.object({
  name: commonSchema.name.required(),
  country: commonSchema.country.required(),
  photos: commonSchema.photos.required(),
  isFeatured: commonSchema.isFeatured,
});

export const updateCitySchema = Joi.object({
  name: commonSchema.name,
  country: commonSchema.country,
  photos: commonSchema.photos,
  isFeatured: commonSchema.isFeatured,
});
