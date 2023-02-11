import { Router } from 'express';

import { paramsSchema, featuredQuerySchema } from '../utils';
import { isAdmin, parseQuery, validator } from '../middleware';

import { Country, addCountrySchema, updateCountrySchema } from '../models';
import { countryController } from '../controllers';

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
router.get('/:id', validator({ paramsSchema }), countryController.getCountryById);

// POST
// api/countries
router.post(
  '/',
  [isAdmin, validator({ bodySchema: addCountrySchema })],
  countryController.addCountry
);

// PATCH
// api/countries/:id
router.patch(
  '/:id',
  [isAdmin, validator({ bodySchema: updateCountrySchema, paramsSchema })],
  countryController.updateCountryById
);

// DELETE
// api/countries/:id
router.delete('/:id', [isAdmin, validator({ paramsSchema })], countryController.deleteCountryById);

export default router;
