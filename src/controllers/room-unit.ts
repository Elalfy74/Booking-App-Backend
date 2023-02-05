import { RequestHandler } from "express";
import _ from "lodash";

import { ERRORS, ENTITES, MESSAGES } from "../utils/utils";

import RoomUnit from "../models/room-unit/room-unit";
import { AddRoomUnitBody, UpdateRoomUnitBody } from "../types/room-unit.types";

const ROOM_UNIT = {
  NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.ROOM_UNIT),
  DUPLICATION: ERRORS.DUPLICATION(
    ENTITES.ROOM_UNIT,
    "Number Related to this Room"
  ),
  EMPTY: ERRORS.EMPTY,
  CREATED: MESSAGES.CREATED(ENTITES.ROOM_UNIT),
  UPDATED: MESSAGES.UPDATED(ENTITES.ROOM_UNIT),
  DELETED: MESSAGES.DELETED(ENTITES.ROOM_UNIT),
};

// @desc    Retrive All Room Units
// @route   GET /api/room-units
// @access  ADMIN
export const getAllRoomUnits: RequestHandler = async (req, res, next) => {
  const roomUnits = await RoomUnit.find();

  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  res.status(200).send(roomUnits);
};

// @desc    Retrive Single Room Unit
// @route   GET /api/room-units/:id
// @access  PUBLIC
export const getRoomUnit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const roomUnit = await RoomUnit.findById(id);

    if (!roomUnit) return next(ROOM_UNIT.NOT_FOUND);

    res.status(200).send(roomUnit);
  } catch (err) {
    next(ROOM_UNIT.NOT_FOUND);
  }
};

// @desc    Add New Room Unit
// @route   POST /api/room-units
// @access  ADMIN
export const addRoomUnit: RequestHandler = async (req, res, next) => {
  const { number, hotel, room }: AddRoomUnitBody = req.body;

  const roomUnit = await RoomUnit.findOne({
    number,
    room,
  });

  if (roomUnit) return next(ROOM_UNIT.DUPLICATION);

  //TODO Check if the room related to the Hotel

  const newRoomUnit = new RoomUnit({
    number,
    hotel,
    room,
  });

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
  const roomUnitbody: UpdateRoomUnitBody = req.body;

  // Check Empty Object
  if (_.isEmpty(roomUnitbody)) return next(ROOM_UNIT.EMPTY);

  try {
    let anotherRoomUnit;
    let isEqual;

    const oldRoomUnit = await RoomUnit.findById(id);

    if (!oldRoomUnit) return next(ROOM_UNIT.NOT_FOUND);

    // CHANGE ROOM ONLY
    if (!roomUnitbody.number) {
      isEqual = _.isEqual(roomUnitbody, { room: oldRoomUnit.room.toString() });
      if (isEqual) return next(ROOM_UNIT.EMPTY);

      anotherRoomUnit = await RoomUnit.findOne({
        number: oldRoomUnit.number,
        room: roomUnitbody.room,
      });
    }
    // CHANGE NUMBER
    else if (!roomUnitbody.room) {
      isEqual = _.isEqual(roomUnitbody, { number: oldRoomUnit.number });
      if (isEqual) return next(ROOM_UNIT.EMPTY);

      anotherRoomUnit = await RoomUnit.findOne({
        number: roomUnitbody.number,
        room: oldRoomUnit.room,
      });
    }
    // CHANGE BOTH
    else {
      isEqual = _.isEqual(roomUnitbody, {
        number: oldRoomUnit.number,
        room: oldRoomUnit.room.toString(),
      });
      if (isEqual) return next(ROOM_UNIT.EMPTY);

      anotherRoomUnit = await RoomUnit.findOne({
        number: roomUnitbody.number,
        room: roomUnitbody.room,
      });
    }

    // Another Room Unit with Same Attributes Already Exist !
    if (anotherRoomUnit) return next(ROOM_UNIT.DUPLICATION);

    oldRoomUnit.number = roomUnitbody.number || oldRoomUnit.number;
    oldRoomUnit.room = roomUnitbody.room || oldRoomUnit.room;

    const updatedRoomUnit = await oldRoomUnit.save();

    res.status(200).send({
      message: ROOM_UNIT.UPDATED,
      updatedRoomUnit,
    });
  } catch (err) {
    next(ROOM_UNIT.NOT_FOUND);
  }
};

// @desc    Delete Room Unit
// @route   DELETE /api/room-units/:id
// @access  ADMIN
export const deleteRoomUnit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const roomUnit = await RoomUnit.findByIdAndRemove(id);

    if (!roomUnit) return next(ROOM_UNIT.NOT_FOUND);

    res.status(200).send({
      message: ROOM_UNIT.DELETED,
      roomUnit,
    });
  } catch (err) {
    next(ROOM_UNIT.NOT_FOUND);
  }
};
