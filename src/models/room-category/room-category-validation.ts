import Joi from "joi";
import { COMMON_SCHEMA } from "../../utils/joi-common";

export const addRoomCategorySchema = Joi.object({
  name: COMMON_SCHEMA.name.required(),
});

export const updateRoomCategorySchema = addRoomCategorySchema;
