import Joi from "joi";
import { addRoomSchema } from "../room/room-validation";

export const addHotelSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  desc: Joi.string().min(4).max(200).required(),
  address: Joi.string().min(4).max(200).required(),
  distanceToDT: Joi.number().min(1).required(),
  category: Joi.string().required(),
  city: Joi.string().required(),
  photos: Joi.array().items(Joi.string()).required(),
  noOfStars: Joi.number().min(1).max(5).required(),
  rooms: Joi.array().items(addRoomSchema).required(),
  isFeatured: Joi.boolean(),
});

export const updateHotelSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  desc: Joi.string().min(4).max(200),
  address: Joi.string().min(4).max(200),
  distanceToDT: Joi.number().min(1),
  category: Joi.string(),
  city: Joi.string(),
  photos: Joi.array(),
  noOfStars: Joi.number().min(1).max(5),
  rooms: Joi.array().items(addRoomSchema),
  isFeatured: Joi.boolean(),
  reviews: Joi.array(),
});
