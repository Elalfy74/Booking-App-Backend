import { Router } from "express";
import * as countryController from "../controllers/country";
import validator from "../middlewares/validator";
import Country from "../models/country/country";
import {
  addCountrySchema,
  updateCountrySchema,
} from "../models/country/country-validation";

const router = Router();

// GET
// api/countries
router.get("/", countryController.getAllCountriesOrFeatured);

// GET
// api/countries/:id
router.get("/:id", countryController.getCountry);

// POST
// api/countries
router.post("/", validator(addCountrySchema), countryController.addCountry);

// PATCH
// api/countries/:id
router.patch(
  "/:id",
  validator(updateCountrySchema),
  countryController.updateCountry
);

// DELETE
// api/countries/:id
router.delete("/:id", countryController.deleteCountry);

export default router;
