import { Router } from "express";

import { isAuth, isAdmin, validator } from "../middlewares";

import * as HotelCategoryController from "../controllers/hotel-category";
import {
  addHotelCategorySchema,
  updateHotelCategorySchema,
} from "../models/hotel-category/hotel-category-validation";

const router = Router();

// GET
// api/hotel-categories
router.get(
  "/",
  [isAuth, isAdmin],
  HotelCategoryController.getAllHotelCategories
);

// GET
// api/hotel-categories/:id
router.get("/:id", HotelCategoryController.getHotelCategory);

// POST
// api/hotel-categories
router.post(
  "/",
  [isAuth, isAdmin, validator(addHotelCategorySchema)],
  HotelCategoryController.addHotelCategory
);

// PATCH
// api/hotel-categories
router.patch(
  "/:id",
  [isAuth, isAdmin, validator(updateHotelCategorySchema)],
  HotelCategoryController.updateHotelCategory
);

// DELETE
// api/hotel-categories
router.delete(
  "/:id",
  [isAuth, isAdmin],
  HotelCategoryController.deleteHotelCategory
);

export default router;
