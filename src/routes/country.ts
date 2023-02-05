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

import Country from "../models/country/country";
import * as countryController from "../controllers/country";
import {
  addCountrySchema,
  updateCountrySchema,
} from "../models/country/country-validation";

const router = Router();

// GET
// api/countries
router.get(
  "/",
  [validator(null, getQuerySchema), filter, pagination(Country), sort],
  countryController.getCountries
);

// GET
// api/countries/:id
router.get("/:id", countryController.getCountry);

// POST
// api/countries
router.post(
  "/",
  [isAuth, isAdmin, validator(addCountrySchema)],
  countryController.addCountry
);

// PATCH
// api/countries/:id
router.patch(
  "/:id",
  [isAuth, isAdmin, validator(updateCountrySchema)],
  countryController.updateCountry
);

// DELETE
// api/countries/:id
router.delete("/:id", [isAuth, isAdmin], countryController.deleteCountry);

export default router;
