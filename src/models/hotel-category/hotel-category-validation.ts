import Joi from "joi";
import { COMMON_SCHEMA } from "../../utils/joi-common";

export const addHotelCategorySchema = Joi.object({
  name: COMMON_SCHEMA.name.required(),
  desc: COMMON_SCHEMA.desc.required(),
});

export const updateHotelCategorySchema = Joi.object({
  name: COMMON_SCHEMA.name,
  desc: COMMON_SCHEMA.desc,
});
