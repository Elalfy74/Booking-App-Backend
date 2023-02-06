import { RequestHandler } from "express";

import { ERRORS, ENTITES, MESSAGES } from "../utils/utils";

import HotelCategory from "../models/hotel-category/hotel-category";
import {
  AddHotelCategoryBody,
  UpdateHotelCategoryBody,
} from "../types/hotel-category.types";

const HOTEL_CATEGORY = {
  NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.HOTEL_CATEGORY),
  DUPLICATION: ERRORS.DUPLICATION(ENTITES.HOTEL_CATEGORY, "Name"),
  CREATED: MESSAGES.CREATED(ENTITES.HOTEL_CATEGORY),
  UPDATED: MESSAGES.UPDATED(ENTITES.HOTEL_CATEGORY),
  DELETED: MESSAGES.DELETED(ENTITES.HOTEL_CATEGORY),
};

// @desc    Retrive All Hotel Categories
// @route   GET /api/hotel-categories
// @access  ADMIN
export const getCategories: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;

  const hotelCategories = await HotelCategory.find(findFilter)
    .limit(limit)
    .skip(startIndex)
    .sort(sort);

  res.status(200).send(hotelCategories);
};

// @desc    Retrive Single Hotel Category
// @route   GET /api/hotel-categories/:id
// @access  PUBLIC
export const getHotelCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotelCategory = await HotelCategory.findById(id);

  if (!hotelCategory) return next(HOTEL_CATEGORY.NOT_FOUND);

  res.status(200).send(hotelCategory);
};

// @desc    Add New Hotel Category
// @route   POST /api/hotel-categories
// @access  ADMIN
export const addHotelCategory: RequestHandler = async (req, res, next) => {
  const body: AddHotelCategoryBody = req.body;

  const hotelCategory = await HotelCategory.findOne({
    name: body.name,
  });

  if (hotelCategory) return next(HOTEL_CATEGORY.DUPLICATION);

  const newHotelCategory = new HotelCategory(body);

  const savedHotelCategory = await newHotelCategory.save();

  res.status(201).send({
    message: HOTEL_CATEGORY.CREATED,
    hotelCategory: savedHotelCategory,
  });
};

// @desc    Update Hotel Category
// @route   PATCH /api/hotel-categories/:id
// @access  ADMIN
export const updateHotelCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: UpdateHotelCategoryBody = req.body;

  // CHECK for duplication name
  const hotelCategory = await HotelCategory.findOne({
    name: body.name,
  });

  if (hotelCategory) return next(HOTEL_CATEGORY.DUPLICATION);

  const updatedHotelCategory = await HotelCategory.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updatedHotelCategory) {
    return next(HOTEL_CATEGORY.NOT_FOUND);
  }

  res.status(200).send({
    message: HOTEL_CATEGORY.UPDATED,
    hotelCategory: updatedHotelCategory,
  });
};

// @desc    Delete Hotel Category
// @route   DELETE /api/hotel-categories/:id
// @access  ADMIN
export const deleteHotelCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const hotelCategory = await HotelCategory.findByIdAndRemove(id);

  if (!hotelCategory) return next(HOTEL_CATEGORY.NOT_FOUND);

  res.status(200).send({
    message: HOTEL_CATEGORY.DELETED,
    hotelCategory,
  });
};
