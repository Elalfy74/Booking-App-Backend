import Joi from "joi";

export const newRoomSchema = Joi.object({
  category: Joi.string().required(),
  number: Joi.number().min(1).required(),
  maxPeople: Joi.number().min(1).required(),
  desc: Joi.string().min(4).max(200).required(),
  currentPrice: Joi.number().min(1).required(),
  photos: Joi.array().items(Joi.string()).min(1).required(),
});
