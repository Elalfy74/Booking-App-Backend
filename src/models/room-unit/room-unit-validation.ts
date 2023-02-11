import Joi from 'joi';

import { IsValidId } from '../../utils';

export const addRoomUnitSchema = Joi.object({
  hotel: IsValidId.required(),
  room: IsValidId.required(),
  number: Joi.number().min(1).required(),
});

export const updateRoomUnitSchema = Joi.object()
  .keys({
    room: IsValidId,
    number: Joi.number().min(1),
    unavailableDates: Joi.array().items(Joi.date()),
  })
  .min(1);
