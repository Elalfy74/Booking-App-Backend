import Joi from 'joi';
import { IsValidId } from '../../utils';
import { addRoomSchema, updateRoomSchema } from '../room/room-validation';

export const addHotelSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  desc: Joi.string().min(4).max(200).required(),
  address: Joi.string().min(4).max(200).required(),
  distanceToDT: Joi.number().min(1).required(),
  category: IsValidId.required(),
  city: IsValidId.required(),
  photos: Joi.array().items(Joi.string()).min(1).required(),
  noOfStars: Joi.number().min(1).max(5).required(),
  rooms: Joi.array().items(addRoomSchema).required(),
  isFeatured: Joi.boolean(),
});

export const updateHotelSchema = Joi.object()
  .keys({
    name: Joi.string().min(2).max(50),
    desc: Joi.string().min(4).max(200),
    address: Joi.string().min(4).max(200),
    distanceToDT: Joi.number().min(1),
    category: IsValidId,
    city: IsValidId,
    photos: Joi.array().items(Joi.string()).min(1),
    noOfStars: Joi.number().min(1).max(5),
    rooms: Joi.array().items(updateRoomSchema),
    isFeatured: Joi.boolean(),
    reviews: Joi.array(),
  })
  .min(1);
