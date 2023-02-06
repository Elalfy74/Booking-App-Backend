import { Router } from "express";

import { paramsSchema, querySchema } from "../utils/utils";
import { isAuth, isAdmin, validator, filter, pagination, sort } from "../middlewares";

import * as HotelCategoryController from "../controllers/hotel-category";
import {
  addHotelCategorySchema,
  updateHotelCategorySchema,
} from "../models/hotel-category/hotel-category-validation";
import HotelCategory from "../models/hotel-category/hotel-category";

const router = Router();

// GET
// api/hotel-categories
router.get(
  "/",
  [validator({ querySchema }), filter, pagination(HotelCategory), sort],
  HotelCategoryController.getCategories
);

// GET
// api/hotel-categories/:id
router.get("/:id", validator({ paramsSchema }), HotelCategoryController.getHotelCategory);

// POST
// api/hotel-categories
router.post(
  "/",
  [isAuth, isAdmin, validator({ bodySchema: addHotelCategorySchema })],
  HotelCategoryController.addHotelCategory
);

// PATCH
// api/hotel-categories
router.patch(
  "/:id",
  [isAuth, isAdmin, validator({ bodySchema: updateHotelCategorySchema, paramsSchema })],
  HotelCategoryController.updateHotelCategory
);

// DELETE
// api/hotel-categories
router.delete(
  "/:id",
  [isAuth, isAdmin, validator({ paramsSchema })],
  HotelCategoryController.deleteHotelCategory
);

export default router;
