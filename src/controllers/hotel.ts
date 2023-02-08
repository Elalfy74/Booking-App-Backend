import { RequestHandler } from 'express';
import mongoose, { ObjectId } from 'mongoose';

import { ENTITES, ERRORS, MESSAGES } from '../utils/utils';
import isValidRefrence from '../utils/isValidRefrence';

import Hotel from '../models/hotel/hotel';
import City from '../models/city/city';

import { AddHotelBody, UpdateHotelBody } from '../types/hotel.types';
import HotelCategory from '../models/hotel-category/hotel-category';
import Room from '../models/room/room';
import { IRoom } from '../types/room.types';

const HOTEL = {
  NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.HOTEL),
  CREATED: MESSAGES.CREATED(ENTITES.HOTEL),
  UPDATED: MESSAGES.UPDATED(ENTITES.HOTEL),
  DELETED: MESSAGES.DELETED(ENTITES.HOTEL),
};

// @desc    Retrive All Hotel
// @route   GET /api/hotels
// @access  PUBLIC
export const getHotels: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;

  const hotels = await Hotel.find(findFilter).limit(limit).skip(startIndex).sort(sort);

  res.status(200).send(hotels);
};

// @desc    Retrive Single Hotel
// @route   GET /api/hotels/:id
// @access  PUBLIC
export const getHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findById(id);

  if (!hotel) return next(HOTEL.NOT_FOUND);

  res.status(200).send(hotel);
};

// @desc    Retrive Hotel Rooms
// @route   GET /api/hotels/rooms/:id
// @access  PUBLIC
export const getRoomsOfHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const rooms = await Hotel.findById(id).select({ rooms: 1 });

  if (!rooms) return next(HOTEL.NOT_FOUND);

  res.setHeader('Content-Range', rooms.rooms.length);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

  res.status(200).send(rooms.rooms);
};

// @desc    Add New Hotel
// @route   POST /api/hotels
// @access  ADMIN
export const addHotel: RequestHandler = async (req, res, next) => {
  const body: AddHotelBody = req.body;

  const hasError = await checkCityAndCategory(body);
  if (hasError) return next(ERRORS.NOT_FOUND(hasError));

  const hotel = new Hotel(body);
  const savedHotel = await hotel.save();

  res.status(201).send({
    message: HOTEL.CREATED,
    hotel: savedHotel,
  });
};

// @desc    Update  Hotel
// @route   PATCH /api/hotels/:id
// @access  ADMIN
export const updateHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: UpdateHotelBody = req.body;

  // Check for valid refrences
  const hasError = await checkCityAndCategory(body);
  if (hasError) return next(ERRORS.NOT_FOUND(hasError));

  // delete the empty id to let mongoose generate it
  if (body.rooms) {
    body.rooms.forEach((room) => {
      if (!room._id) delete room._id;
    });
  }
  const updatedHotel = await Hotel.findByIdAndUpdate(id, body, { new: true });

  res.status(200).send({
    message: HOTEL.UPDATED,
    hotel: updatedHotel,
  });
};

// @desc    Delete Hotel
// @route   PUT /api/hotel/:id
// @access  ADMIN
export const deleteHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findByIdAndRemove(id);

  if (!hotel) return next(HOTEL.NOT_FOUND);

  res.status(200).send({
    message: HOTEL.DELETED,
    hotel,
  });
};

export async function hotelHaveRoom(hotelId: ObjectId, roomId: ObjectId) {
  let isFound = false;

  const hotel = await Hotel.findById(hotelId).select({ rooms: 1 });

  if (!hotel) throw HOTEL.NOT_FOUND;

  for (let i = 0; i < hotel.rooms.length; i++) {
    if (hotel.rooms[i]._id.toString() === roomId.toString()) {
      isFound = true;
      break;
    }
  }

  return isFound;
}

async function checkCityAndCategory(body: AddHotelBody | UpdateHotelBody) {
  // Check Category isValid
  if (body.category) {
    const category = await isValidRefrence({
      id: body.category,
      Model: HotelCategory,
    });
    if (!category) return ENTITES.HOTEL_CATEGORY;
  }

  // Check City isValid
  if (body.city) {
    const city = await isValidRefrence({
      id: body.city,
      Model: City,
    });
    if (!city) return ENTITES.CITY;
  }
  return;
}
