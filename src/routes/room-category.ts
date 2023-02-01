import { Router } from "express";
import * as RoomCategoryController from "../controllers/room-category";
import validator from "../middlewares/validator";
import { addRoomCategorySchema } from "../models/room-category/room-category-validation";

const router = Router();

// GET
// api/room-categories
router.get("/", RoomCategoryController.getAllRoomCategories);

// GET
// api/room-categories/:id
router.get("/:id", RoomCategoryController.getRoomCategory);

// POST
// api/room-categories
router.post(
  "/",
  validator(addRoomCategorySchema),
  RoomCategoryController.addRoomCategory
);

// DELETE
// api/room-categories
router.delete("/:id", RoomCategoryController.deleteRoomCategory);

export default router;
