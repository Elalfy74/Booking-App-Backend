import { Router } from "express";

import { featuredQuerySchema, paramsSchema } from "../utils/utils";
import { filter, isAdmin, isAuth, pagination, sort, validator } from "../middlewares";

import City from "../models/city/city";
import * as cityController from "../controllers/city";
import { addCitySchema, updateCitySchema } from "../models/city/city-validation";

const router = Router();

// GET
// api/cities
router.get(
  "/",
  [validator({ querySchema: featuredQuerySchema }), filter, pagination(City), sort],
  cityController.getCities
);

// GET
// api/cities/:id
router.get("/:id", validator({ paramsSchema }), cityController.getCity);

// POST
// api/cities
router.post(
  "/",
  [isAuth, isAdmin, validator({ bodySchema: addCitySchema })],
  cityController.addCity
);

// PATCH
// api/cities/:id
router.patch(
  "/:id",
  [isAuth, isAdmin, validator({ bodySchema: updateCitySchema, paramsSchema })],
  cityController.updateCity
);

// DELETE
// api/cities/:id
router.delete("/:id", [isAuth, isAdmin, validator({ paramsSchema })], cityController.deleteCity);

export default router;
