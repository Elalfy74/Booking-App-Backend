import { RequestHandler } from "express";
import { HttpError } from "http-errors";

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

  try {
    const hotelCategory = await HotelCategory.findById(id);

    if (!hotelCategory) return next(HOTEL_CATEGORY.NOT_FOUND);

    res.status(200).send(hotelCategory);
  } catch (err) {
    next(HOTEL_CATEGORY.NOT_FOUND);
  }
};

// @desc    Add New Hotel Category
// @route   POST /api/hotel-categories
// @access  ADMIN
export const addHotelCategory: RequestHandler = async (req, res, next) => {
  const { name, desc }: AddHotelCategoryBody = req.body;

  const hotelCategory = await HotelCategory.findOne({
    name,
  });

  if (hotelCategory) return next(HOTEL_CATEGORY.DUPLICATION);

  const newHotelCategory = new HotelCategory({
    name,
    desc,
  });

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

  try {
    const hotelCategory = await HotelCategory.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!hotelCategory) {
      return next(HOTEL_CATEGORY.NOT_FOUND);
    }

    res.status(200).send({
      message: HOTEL_CATEGORY.UPDATED,
      hotelCategory,
    });
  } catch (err) {
    const { code } = err as HttpError;

    // Duplication Value
    if (code === 11000) {
      return next(HOTEL_CATEGORY.DUPLICATION);
    }
    next(HOTEL_CATEGORY.NOT_FOUND);
  }
};

// @desc    Delete Hotel Category
// @route   DELETE /api/hotel-categories/:id
// @access  ADMIN
export const deleteHotelCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotelCategory = await HotelCategory.findByIdAndRemove(id);

    if (!hotelCategory) return next(HOTEL_CATEGORY.NOT_FOUND);

    res.status(200).send({
      message: HOTEL_CATEGORY.DELETED,
      hotelCategory,
    });
  } catch (err) {
    next(HOTEL_CATEGORY.NOT_FOUND);
  }
};
