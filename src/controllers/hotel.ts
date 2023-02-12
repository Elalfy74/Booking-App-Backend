import { RequestHandler } from 'express';

import { ENTITIES, invalidInput, Utils } from '../utils';
import { isValidReference } from '../utils/is-valid-reference';

import { City, Hotel } from '../models';
import { AddHotelBody, UpdateHotelBody } from '../types/hotel.types';

const HOTEL = new Utils(ENTITIES.HOTEL);

// @desc    Retrieve All Hotel
// @route   GET /api/hotels
// @access  PUBLIC
export const getHotels: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;
  const { withCity } = req.query;

  const city = withCity && typeof withCity === 'string' ? 'city' : '';

  const hotels = await Hotel.find(findFilter)
    .populate(city, 'name')
    .limit(limit)
    .skip(startIndex)
    .sort(sort);

  res.status(200).send(hotels);
};

// @desc    Retrieve Single Hotel
// @route   GET /api/hotels/:id
// @access  PUBLIC
export const getHotelById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findById(id);

  if (!hotel) return next(HOTEL.NOT_FOUND());

  res.status(200).send(hotel);
};

// @desc    Retrieve Hotel Rooms
// @route   GET /api/hotels/rooms/:id
// @access  PUBLIC
//TODO
export const getRoomsOfHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const rooms = await Hotel.findById(id).select({ rooms: 1 });

  if (!rooms) return next(HOTEL.NOT_FOUND());

  res.setHeader('Content-Range', rooms.rooms.length);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

  res.status(200).send(rooms.rooms);
};

// @desc    Add New Hotel
// @route   POST /api/hotels
// @access  ADMIN
export const addHotel: RequestHandler = async (req, res, next) => {
  const body: AddHotelBody = req.body;

  // CHECK for valid reference
  const city = await isValidReference({
    id: body.city,
    Model: City,
  });
  if (!city) return next(invalidInput(ENTITIES.CITY));

  const hotel = new Hotel(body);
  const savedHotel = await hotel.save();

  res.status(201).send({
    message: HOTEL.CREATED(),
    hotel: savedHotel,
  });
};

// @desc    Update  Hotel
// @route   PATCH /api/hotels/:id
// @access  ADMIN
export const updateHotelById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: UpdateHotelBody = req.body;

  // CHECK for valid reference
  if (body.city) {
    const city = await isValidReference({
      id: body.city,
      Model: City,
    });
    if (!city) return next(invalidInput(ENTITIES.CITY));
  }

  // DELETE the empty id to let mongoose generate it
  if (body.rooms) {
    body.rooms.forEach((room) => {
      if (!room._id) delete room._id;
    });
  }

  const updatedHotel = await Hotel.findByIdAndUpdate(id, body, { new: true });

  if (!updateHotelById) return next(HOTEL.NOT_FOUND());

  res.status(200).send({
    message: HOTEL.UPDATED(),
    hotel: updatedHotel,
  });
};

// @desc    Delete Hotel
// @route   PUT /api/hotel/:id
// @access  ADMIN
export const deleteHotelById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findByIdAndRemove(id);

  if (!hotel) return next(HOTEL.NOT_FOUND());

  res.status(200).send({
    message: HOTEL.DELETED(),
    hotel,
  });
};
