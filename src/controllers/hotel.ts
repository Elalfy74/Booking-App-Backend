import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Hotel from "../models/hotel/hotel";
import { AddHotelBody } from "../types/hotel.types";

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

  if (featured === "true") {
    hotels = await Hotel.find({
      isFeatured: true,
    });
  } else {
    hotels = await Hotel.find();
  }

  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  res.status(200).send(hotels);
};

// @desc    Retrive Single Hotel
// @route   GET /api/hotel/:id
// @access  PUBLIC
export const getHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findById(id);

  if (!hotel) throw createHttpError.NotFound("Hotel Not Found");

  res.status(200).send(hotel);
};

// @desc    Add New Hotel
// @route   POST /api/hotel
// @access  ADMIN //TODO
export const addHotel: RequestHandler = async (req, res, next) => {
  const body: AddHotelBody = req.body;

  const hotel = new Hotel(body);

  const savedHotel = await hotel.save();

  res.status(201).send({
    message: "Successfully added Hotel",
    hotel: savedHotel,
  });
};

// @desc    Delete Hotel
// @route   PUT /api/hotel/:id
// @access  ADMIN //TODO
export const deleteHotel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findByIdAndRemove({ _id: id });

  if (!hotel) createHttpError.NotFound("Hotel Not Found");

  res.status(200).send({
    message: "Hotel  deleted Successfully",
    hotel,
  });
};
