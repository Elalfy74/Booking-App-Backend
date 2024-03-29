import { RequestHandler } from 'express';
import { ObjectId } from 'mongoose';
import createHttpError from 'http-errors';

import { ENTITIES, invalidInput, Utils } from '../utils';

import { Hotel, RoomUnit } from '../models';
import { AddRoomUnitBody, UpdateRoomUnitBody } from '../types/room-unit.types';

const ROOM_UNIT = new Utils(ENTITIES.ROOM_UNIT);

// @desc    Retrieve All Room Units
// @route   GET /api/room-units
// @access  ADMIN
export const getRoomUnits: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { hotel: 1 }, startIndex = 0, limit = 10 } = req;

  const roomUnits = await RoomUnit.find(findFilter).limit(limit).skip(startIndex).sort(sort);

  res.status(200).send(roomUnits);
};

// @desc    Retrieve Single Room Unit
// @route   GET /api/room-units/:id
// @access  PUBLIC
export const getRoomUnitById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const roomUnit = await RoomUnit.findById(id);

  if (!roomUnit) return next(ROOM_UNIT.NOT_FOUND());

  res.status(200).send(roomUnit);
};

// @desc    Add New Room Unit
// @route   POST /api/room-units
// @access  ADMIN
export const addRoomUnit: RequestHandler = async (req, res, next) => {
  const body: AddRoomUnitBody = req.body;

  // Check another related Room with same number related to that room
  const roomUnit = await RoomUnit.findOne({
    number: body.number,
    room: body.room,
  });

  if (roomUnit) return next(ROOM_UNIT.DUPLICATION('Number Related to this Room'));

  // Check if the hotel contains the room
  const isHotelHaveRoom = await hotelHaveRoom(body.hotel, body.room);
  if (!isHotelHaveRoom) return next(createHttpError.Forbidden('Wrong Room Id'));

  const newRoomUnit = new RoomUnit(body);

  const savedRoomUnit = await newRoomUnit.save();

  res.status(201).send({
    message: ROOM_UNIT.CREATED(),
    roomUnit: savedRoomUnit,
  });
};

// @desc    Update Room Unit
// @route   PATCH /api/room-units/:id
// @access  ADMIN
export const updateRoomUnit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: UpdateRoomUnitBody = req.body;

  let anotherRoomUnit;

  // CHECK is room unit exist
  const oldRoomUnit = await RoomUnit.findById(id);
  if (!oldRoomUnit) return next(ROOM_UNIT.NOT_FOUND());

  // CHANGE ROOM ONLY
  if (!body.number) {
    anotherRoomUnit = await RoomUnit.findOne({
      number: oldRoomUnit.number,
      room: body.room,
    });
  }
  // CHANGE NUMBER
  else if (!body.room) {
    anotherRoomUnit = await RoomUnit.findOne({
      number: body.number,
      room: oldRoomUnit.room,
    });
  }
  // CHANGE BOTH
  else {
    anotherRoomUnit = await RoomUnit.findOne({
      number: body.number,
      room: body.room,
    });
  }

  // Another Room Unit with Same Attributes Already Exist !
  if (anotherRoomUnit) return next(ROOM_UNIT.DUPLICATION('Number Related to this Room'));

  oldRoomUnit.number = body.number || oldRoomUnit.number;
  if (body.room) {
    oldRoomUnit.room = body.room as unknown as ObjectId;
  }

  console.log(oldRoomUnit.room);

  const updatedRoomUnit = await oldRoomUnit.save();

  res.status(200).send({
    message: ROOM_UNIT.UPDATED(),
    updatedRoomUnit,
  });
};

// @desc    Delete Room Unit
// @route   DELETE /api/room-units/:id
// @access  ADMIN
export const deleteRoomUnit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const roomUnit = await RoomUnit.findByIdAndRemove(id);

  if (!roomUnit) return next(ROOM_UNIT.NOT_FOUND());

  res.status(200).send({
    message: ROOM_UNIT.DELETED(),
    roomUnit,
  });
};

// *********** Helpers ***********

export async function hotelHaveRoom(hotelId: string, roomId: string) {
  let isFound = false;

  const hotel = await Hotel.findById(hotelId).select({ rooms: 1 });

  if (!hotel) throw invalidInput(ENTITIES.HOTEL);

  for (let i = 0; i < hotel.rooms.length; i++) {
    if (hotel.rooms[i]._id === roomId) {
      isFound = true;
      break;
    }
  }

  return isFound;
}
