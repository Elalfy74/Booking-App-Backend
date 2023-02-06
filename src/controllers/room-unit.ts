import { RequestHandler } from "express";
import _ from "lodash";

import { ERRORS, ENTITES, MESSAGES } from "../utils/utils";

import RoomUnit from "../models/room-unit/room-unit";
import { AddRoomUnitBody, UpdateRoomUnitBody } from "../types/room-unit.types";
import { hotelHaveRoom } from "./hotel";
import createHttpError from "http-errors";

const ROOM_UNIT = {
  NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.ROOM_UNIT),
  WRONG_ROOM: createHttpError.BadRequest("Wrong Room Id"),
  DUPLICATION: ERRORS.DUPLICATION(ENTITES.ROOM_UNIT, "Number Related to this Room"),
  CREATED: MESSAGES.CREATED(ENTITES.ROOM_UNIT),
  UPDATED: MESSAGES.UPDATED(ENTITES.ROOM_UNIT),
  DELETED: MESSAGES.DELETED(ENTITES.ROOM_UNIT),
};

// @desc    Retrive All Room Units
// @route   GET /api/room-units
// @access  ADMIN
export const getRoomUnits: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { hotel: 1 }, startIndex = 0, limit = 10 } = req;

  const roomUnits = await RoomUnit.find(findFilter).limit(limit).skip(startIndex).sort(sort);

  res.status(200).send(roomUnits);
};

// @desc    Retrive Single Room Unit
// @route   GET /api/room-units/:id
// @access  PUBLIC
export const getRoomUnit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const roomUnit = await RoomUnit.findById(id);

  if (!roomUnit) return next(ROOM_UNIT.NOT_FOUND);

  res.status(200).send(roomUnit);
};

// @desc    Add New Room Unit
// @route   POST /api/room-units
// @access  ADMIN
export const addRoomUnit: RequestHandler = async (req, res, next) => {
  const body: AddRoomUnitBody = req.body;

  // Check another related Room with same number
  const roomUnit = await RoomUnit.findOne({
    number: body.number,
    room: body.room,
  });
  if (roomUnit) return next(ROOM_UNIT.DUPLICATION);

  // Check if the hotel contains the room
  const isHotelHaveRoom = await hotelHaveRoom(body.hotel, body.room);
  if (!isHotelHaveRoom) return next(ROOM_UNIT.WRONG_ROOM);

  const newRoomUnit = new RoomUnit(body);

  const savedRoomUnit = await newRoomUnit.save();

  res.status(201).send({
    message: ROOM_UNIT.CREATED,
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

  const oldRoomUnit = await RoomUnit.findById(id);

  if (!oldRoomUnit) return next(ROOM_UNIT.NOT_FOUND);

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
  if (anotherRoomUnit) return next(ROOM_UNIT.DUPLICATION);

  oldRoomUnit.number = body.number || oldRoomUnit.number;
  oldRoomUnit.room = body.room || oldRoomUnit.room;

  const updatedRoomUnit = await oldRoomUnit.save();

  res.status(200).send({
    message: ROOM_UNIT.UPDATED,
    updatedRoomUnit,
  });
};

// @desc    Delete Room Unit
// @route   DELETE /api/room-units/:id
// @access  ADMIN
export const deleteRoomUnit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const roomUnit = await RoomUnit.findByIdAndRemove(id);

  if (!roomUnit) return next(ROOM_UNIT.NOT_FOUND);

  res.status(200).send({
    message: ROOM_UNIT.DELETED,
    roomUnit,
  });
};
