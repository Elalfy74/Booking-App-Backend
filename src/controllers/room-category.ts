// import { RequestHandler } from "express";
// import { HttpError } from "http-errors";

// import { ENTITES, ERRORS, MESSAGES } from "../utils/utils";

// import RoomCategory from "../models/room-category/room-category";
// import {
//   AddRoomCategoryBody,
//   UpdateRoomCategoryBody,
// } from "../types/room-category.types";

// const ROOM_CATEGORY = {
//   NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.ROOM_CATEGORY),
//   DUPLICATION: ERRORS.DUPLICATION(ENTITES.ROOM_CATEGORY, "Name"),
//   CREATED: MESSAGES.CREATED(ENTITES.ROOM_CATEGORY),
//   UPDATED: MESSAGES.UPDATED(ENTITES.ROOM_CATEGORY),
//   DELETED: MESSAGES.DELETED(ENTITES.ROOM_CATEGORY),
// };

// // @desc    Retrive All Room Categories
// // @route   GET /api/room-categories
// // @access  ADMIN
// export const getAllRoomCategories: RequestHandler = async (req, res, next) => {
//   const roomCategories = await RoomCategory.find();

//   res.setHeader("Content-Range", "30");
//   res.setHeader("Access-Control-Expose-Headers", "Content-Range");

//   res.status(200).send(roomCategories);
// };

// // @desc    Retrive Single Room Category
// // @route   GET /api/room-categories/:id
// // @access  PUBLIC
// export const getRoomCategory: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const roomCategory = await RoomCategory.findById(id);

//     if (!roomCategory) return next(ROOM_CATEGORY.NOT_FOUND);

//     res.status(200).send(roomCategory);
//   } catch (err) {
//     next(ROOM_CATEGORY.NOT_FOUND);
//   }
// };

// // @desc    Add New Room Category
// // @route   POST /api/room-categories
// // @access  ADMIN
// export const addRoomCategory: RequestHandler = async (req, res, next) => {
//   const { name }: AddRoomCategoryBody = req.body;

//   const roomCategory = await RoomCategory.findOne({
//     name,
//   });

//   if (roomCategory) return next(ROOM_CATEGORY.DUPLICATION);

//   const newRoomCategory = new RoomCategory({ name });

//   const savedRoomCategory = await newRoomCategory.save();

//   res.status(201).send({
//     message: ROOM_CATEGORY.CREATED,
//     roomCategory: savedRoomCategory,
//   });
// };

// // @desc    Update Room Category
// // @route   PATCH /api/room-categories/:id
// // @access  ADMIN
// export const updateRoomCategory: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;
//   const { name }: UpdateRoomCategoryBody = req.body;

//   try {
//     const roomCategory = await RoomCategory.findByIdAndUpdate(
//       id,
//       { name },
//       { new: true }
//     );

//     if (!roomCategory) {
//       return next(ROOM_CATEGORY.NOT_FOUND);
//     }

//     res.status(200).send({
//       message: ROOM_CATEGORY.UPDATED,
//       roomCategory,
//     });
//   } catch (err) {
//     const { code } = err as HttpError;

//     // Duplication Value
//     if (code === 11000) {
//       return next(ROOM_CATEGORY.DUPLICATION);
//     }
//     next(ROOM_CATEGORY.NOT_FOUND);
//   }
// };

// // @desc    Delete Room Category
// // @route   DELETE /api/room-categories/:id
// // @access  ADMIN
// export const deleteRoomCategory: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const roomCategory = await RoomCategory.findByIdAndRemove(id);

//     // VALID ID BUT NOT FOUND
//     if (!roomCategory) return next(ROOM_CATEGORY.NOT_FOUND);

//     res.status(200).send({
//       message: ROOM_CATEGORY.DELETED,
//       roomCategory,
//     });
//   } catch (err) {
//     // NOT VALID ID
//     next(ROOM_CATEGORY.NOT_FOUND);
//   }
// };
