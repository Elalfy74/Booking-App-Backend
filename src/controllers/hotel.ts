import { RequestHandler } from "express";

import { ENTITES, ERRORS, MESSAGES } from "../utils/utils";

import Hotel from "../models/hotel/hotel";
import { AddHotelBody } from "../types/hotel.types";

const HOTEL = {
  NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.HOTEL),
  CREATED: MESSAGES.CREATED(ENTITES.HOTEL),
  UPDATED: MESSAGES.UPDATED(ENTITES.HOTEL),
  DELETED: MESSAGES.DELETED(ENTITES.HOTEL),
};

// @desc    Retrive All Hotel
// @route   GET /api/hotels
// @access  PUBLIC
export const getAllHotelsOrFeatured: RequestHandler = async (
  req,
  res,
  next
) => {
  let hotels;
  const featured = req.query.featured;
  let isFeaturedFilter = {};

  if (featured === "true") isFeaturedFilter = { isFeatured: true };

  hotels = await Hotel.find(isFeaturedFilter);

  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  res.status(200).send(hotels);
};

// @desc    Retrive Single Hotel
// @route   GET /api/hotels/:id
// @access  PUBLIC
export const getHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);

    if (!hotel) return next(HOTEL.NOT_FOUND);

    res.status(200).send(hotel);
  } catch (err) {
    next(HOTEL.NOT_FOUND);
  }
};

// @desc    Retrive Hotel Rooms
// @route   GET /api/hotels/rooms/:id
// @access  PUBLIC
export const getRoomsOfHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rooms = await Hotel.findById(id).select({ rooms: 1 });
    // const rooms = await Hotel.findById(id)
    //   .populate({
    //     path: "rooms",
    //     populate: {
    //       path: "category",
    //       model: "RoomCategory",
    //     },
    //   })
    //   .select({ rooms: 1 });

    if (!rooms) return next(HOTEL.NOT_FOUND);

    res.setHeader("Content-Range", "30");
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");

    res.status(200).send(rooms.rooms);
  } catch (err) {
    next(HOTEL.NOT_FOUND);
  }
};

// @desc    Add New Hotel
// @route   POST /api/hotels
// @access  ADMIN
export const addHotel: RequestHandler = async (req, res, next) => {
  const body: AddHotelBody = req.body;

  const hotel = new Hotel(body);

  const savedHotel = await hotel.save();

  res.status(201).send({
    message: HOTEL.CREATED,
    hotel: savedHotel,
  });
};

// @desc    Update  Hotel
// @route   PATCH /api/hotels/:id
// @access  ADMIN //TODO
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
