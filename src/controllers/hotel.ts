import { RequestHandler } from "express";

import { ENTITES, ERRORS, MESSAGES } from "../utils/utils";

import Hotel from "../models/hotel/hotel";
import { AddHotelBody, UpdateHotelBody } from "../types/hotel.types";
import createHttpError from "http-errors";
import { ObjectId } from "mongoose";
import isValidRefrence from "../utils/isValidRefrence";
import HotelCategory from "../models/hotel-category/hotel-category";

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

  res.status(200).send(rooms.rooms);
};

// @desc    Add New Hotel
// @route   POST /api/hotels
// @access  ADMIN
export const addHotel: RequestHandler = async (req, res, next) => {
  const body: AddHotelBody = req.body;

  await checkCityAndCategory(body);

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
  const body = req.body;

  const hotel = await Hotel.findById(id);

  hotel?.rooms.push(body.rooms[0]);

  const updatedHotel = await hotel?.save();

  res.status(200).send({
    message: "Successfully Updated Hotel",
    hotel: updatedHotel,
  });
};

// @desc    Delete Hotel
// @route   PUT /api/hotel/:id
// @access  ADMIN
export const deleteHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByIdAndRemove({ _id: id });

    if (!hotel) return next(HOTEL.NOT_FOUND);

    res.status(200).send({
      message: HOTEL.DELETED,
      hotel,
    });
  } catch (err) {
    next(HOTEL.NOT_FOUND);
  }
};

export async function hotelHaveRoom(hotelId: ObjectId, roomId: ObjectId) {
  let isFound = false;

  const hotel = await Hotel.findById(hotelId).select({ rooms: 1 });

  if (!hotel) throw createHttpError.NotFound("Hotel Not Found");

  for (let i = 0; i < hotel.rooms.length; i++) {
    if (hotel.rooms[i]._id === roomId.toString()) {
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
      Model: HotelCategory,
    });
    if (!city) return ENTITES.CITY;
  }
}
