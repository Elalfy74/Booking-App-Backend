import Joi from 'joi';

export const addRoomSchema = Joi.object({
  title: Joi.string().required(),
  beds: Joi.number().min(1).required(),
  desc: Joi.string().min(4).max(200).required(),
  currentPrice: Joi.number().min(1).required(),
  photos: Joi.array().items(Joi.string()).min(1).required(),
});

export const updateRoomSchema = Joi.object({
  _id: Joi.string().allow(''),
  title: Joi.string(),
  beds: Joi.number().min(1),
  desc: Joi.string().min(4).max(200),
  currentPrice: Joi.number().min(1),
  photos: Joi.array().items(Joi.string()).min(1),
});
