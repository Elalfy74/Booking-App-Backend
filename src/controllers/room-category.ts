import { RequestHandler } from "express";
import createHttpError from "http-errors";
import RoomCategory from "../models/room-category/room-category";
import { AddRoomCategoryBody } from "../types/room-category.types";

// @desc    Retrive All Room Categories
// @route   GET /api/room-categories
// @access  ADMIN //TODO
export const getAllRoomCategories: RequestHandler = async (req, res, next) => {
  const roomCategories = await RoomCategory.find();

  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  res.status(200).send(roomCategories);
};

// @desc    Retrive Single Room Category
// @route   GET /api/room-categories/:id
// @access  PUBLIC
export const getRoomCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const roomCategory = await RoomCategory.findById(id);

  if (!roomCategory) throw createHttpError.NotFound("Room Category Not Found");

  res.status(200).send(roomCategory);
};

// @desc    Add New Room Category
// @route   POST /api/room-categories
// @access  ADMIN //TODO
export const addRoomCategory: RequestHandler = async (req, res, next) => {
  const { name, desc, noOfBeds }: AddRoomCategoryBody = req.body;

  const roomCategory = new RoomCategory({
    name,
    desc,
    noOfBeds,
  });

  const savedRoomCategory = await roomCategory.save();

  res.status(201).send({
    message: "Successfully added Room Category",
    roomCategory: savedRoomCategory,
  });
};

// @desc    Delete Room Category
// @route   PUT /api/room-categories/:id
// @access  ADMIN //TODO
export const deleteRoomCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const roomCategory = await RoomCategory.findByIdAndRemove({ _id: id });

  if (!roomCategory) createHttpError.NotFound("Room Category Not Found");

  res.status(200).send({
    message: "Room Category deleted Successfully",
    roomCategory,
  });
};
