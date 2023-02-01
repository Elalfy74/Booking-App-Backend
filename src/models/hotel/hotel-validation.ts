import Joi from "joi";
import { newRoomSchema } from "../room/room-validation";

export const addHotelSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  desc: Joi.string().min(4).max(200).required(),
  address: Joi.string().min(4).max(200).required(),
  distanceToDT: Joi.number().min(1).required(),
  category: Joi.string().required(),
  city: Joi.string().required(),
  photos: Joi.array().min(1).required(),
  noOfStars: Joi.number().min(1).max(5).required(),
  rooms: Joi.array().items(newRoomSchema),
  isFeatured: Joi.boolean(),
});
