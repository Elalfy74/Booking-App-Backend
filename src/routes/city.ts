import { Router } from "express";

import validator from "../middlewares/validator";

import * as cityController from "../controllers/city";
import {
  addCitySchema,
  updateCitySchema,
} from "../models/city/city-validation";
import admin from "../middlewares/admin";
import auth from "../middlewares/auth";

const router = Router();

// GET
// api/cities
router.get("/", cityController.getAllCitiesOrFeatured);

// GET
// api/cities/:id
router.get("/:id", cityController.getCity);

// POST
// api/cities
router.post(
  "/",
  validator(addCitySchema),
  // [auth, admin, validator(addCitySchema)],
  cityController.addCity
);

// PATCH
// api/countries/:id
router.patch("/:id", validator(updateCitySchema), cityController.updateCity);

// DELETE
// api/countries/:id
router.delete("/:id", cityController.deleteCity);

export default router;
