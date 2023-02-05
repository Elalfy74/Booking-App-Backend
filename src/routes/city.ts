import { Router } from "express";

import { getQuerySchema } from "../utils/utils";
import {
  filter,
  isAdmin,
  isAuth,
  pagination,
  sort,
  validator,
} from "../middlewares";

import City from "../models/city/city";
import * as cityController from "../controllers/city";
import {
  addCitySchema,
  updateCitySchema,
} from "../models/city/city-validation";

const router = Router();

// GET
// api/cities
router.get(
  "/",
  [validator(null, getQuerySchema), filter, pagination(City), sort],
  cityController.getCities
);

// GET
// api/cities/:id
router.get("/:id", cityController.getCity);

// POST
// api/cities
router.post(
  "/",
  [isAuth, isAdmin, validator(addCitySchema)],
  cityController.addCity
);

// PATCH
// api/cities/:id
router.patch(
  "/:id",
  [isAuth, isAdmin, validator(updateCitySchema)],
  cityController.updateCity
);

// DELETE
// api/cities/:id
router.delete("/:id", [isAuth, isAdmin], cityController.deleteCity);

export default router;
