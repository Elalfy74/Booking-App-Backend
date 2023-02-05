import Joi from "joi";

export const addRoomUnitSchema = Joi.object({
  hotel: Joi.string().required(),
  room: Joi.string().required(),
  number: Joi.number().min(1).required(),
});

export const updateRoomUnitSchema = Joi.object({
  room: Joi.string(),
  number: Joi.number().min(1),
  unavailableDates: Joi.array(),
});
