import Joi from "joi";

export const addRoomSchema = Joi.object({
  title: Joi.string().required(),
  maxPeople: Joi.number().min(1).required(),
  beds: Joi.number().min(1).required(),
  desc: Joi.string().min(4).max(200).required(),
  currentPrice: Joi.number().min(1).required(),
  photos: Joi.array().items(Joi.string()).required(),
});
