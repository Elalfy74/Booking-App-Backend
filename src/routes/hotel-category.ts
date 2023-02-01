import { Router } from "express";
import * as HotelCategoryController from "../controllers/hotel-category";
import validator from "../middlewares/validator";
import { addHotelCategorySchema } from "../models/hotel-category/hotel-category-validation";

const router = Router();

// GET
// api/hotel-categories
router.get("/", HotelCategoryController.getAllHotelCategories);

// GET
// api/hotel-categories/:id
router.get("/:id", HotelCategoryController.getHotelCategory);

// POST
// api/hotel-categories
router.post(
  "/",
  validator(addHotelCategorySchema),
  HotelCategoryController.addHotelCategory
);

// DELETE
// api/hotel-categories
router.delete("/:id", HotelCategoryController.deleteHotelCategory);

export default router;
