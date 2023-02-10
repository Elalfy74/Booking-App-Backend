import Joi from 'joi';

export const addCountrySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  photo: Joi.string().uri().required(),
  isFeatured: Joi.boolean(),
});

export const updateCountrySchema = Joi.object()
  .keys({
    name: Joi.string().min(2).max(50),
    photo: Joi.string().uri(),
    isFeatured: Joi.boolean(),
  })
  .min(1);
