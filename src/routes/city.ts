import { Router } from "express";

import validator from "../middlewares/validator";

import * as cityController from "../controllers/city";
import { addCitySchema } from "../models/city/city-validation";
import admin from "../middlewares/admin";
import auth from "../middlewares/auth";

const router = Router();

// Get ALL
router.get("/", cityController.getAllCities);

router.get("/:id", cityController.getCity);

router.post(
  "/add",
  [auth, admin, validator(addCitySchema)],
  cityController.addCity
);

export default router;
