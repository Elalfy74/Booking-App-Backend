import Joi from "joi";

export const addHotelCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  desc: Joi.string().min(4).max(200).required(),
});
