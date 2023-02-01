import Joi from "joi";

export const addRoomCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  desc: Joi.string().min(4).max(200).required(),
  noOfBeds: Joi.number().min(1).max(10).required(),
});
