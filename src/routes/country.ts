import { Router } from 'express';

import { paramsSchema, featuredQuerySchema } from '../utils/utils';
import { isAdmin, isAuth, parseQuery, validator } from '../middlewares';

import Country from '../models/country/country';
import * as countryController from '../controllers/country';
import { addCountrySchema, updateCountrySchema } from '../models/country/country-validation';

const router = Router();

// GET
// api/countries
router.get(
  '/',
  [validator({ querySchema: featuredQuerySchema }), parseQuery(Country)],
  countryController.getCountries
);

// GET
// api/countries/:id
router.get('/:id', validator({ paramsSchema }), countryController.getCountry);

// POST
// api/countries
router.post(
  '/',
  [isAuth, isAdmin, validator({ bodySchema: addCountrySchema })],
  countryController.addCountry
);

// PATCH
// api/countries/:id
router.patch(
  '/:id',
  [isAuth, isAdmin, validator({ bodySchema: updateCountrySchema, paramsSchema })],
  countryController.updateCountry
);

// DELETE
// api/countries/:id
router.delete(
  '/:id',
  [isAuth, isAdmin, validator({ paramsSchema })],
  countryController.deleteCountry
);

export default router;
