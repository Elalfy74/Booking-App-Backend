import { RequestHandler } from "express";
import createHttpError from "http-errors";
import HotelCategory from "../models/hotel-category/hotel-category";
import { AddHotelCategoryBody } from "../types/hotel-category.types";

// @desc    Retrive All Hotel Categories
// @route   GET /api/hotel-categories
// @access  ADMIN //TODO
export const getAllHotelCategories: RequestHandler = async (req, res, next) => {
  const hotelCategories = await HotelCategory.find();

  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  res.status(200).send(hotelCategories);
};

// @desc    Retrive Single Hotel Category
// @route   GET /api/hotel-categories/:id
// @access  PUBLIC
export const getHotelCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotelCategory = await HotelCategory.findById(id);

  if (!hotelCategory)
    throw createHttpError.NotFound("Hotel Category Not Found");

  res.status(200).send(hotelCategory);
};

// @desc    Add New Hotel Category
// @route   POST /api/hotel-categories
// @access  ADMIN //TODO
export const addHotelCategory: RequestHandler = async (req, res, next) => {
  const { name, desc }: AddHotelCategoryBody = req.body;

  const hotelCategory = new HotelCategory({
    name,
    desc,
  });

  const savedHotelCategory = await hotelCategory.save();

  res.status(201).send({
    message: "Successfully added Hotel Category",
    hotelCategory: savedHotelCategory,
  });
};

// @desc    Delete Hotel Category
// @route   PUT /api/hotel-categories/:id
// @access  ADMIN //TODO
export const deleteHotelCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotelCategory = await HotelCategory.findByIdAndRemove({ _id: id });

  if (!hotelCategory) createHttpError.NotFound("Hotel Category Not Found");

  res.status(200).send({
    message: "Hotel Category deleted Successfully",
    hotelCategory,
  });
};
