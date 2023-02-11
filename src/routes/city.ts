import { Router } from 'express';

import { featuredQuerySchema, paramsSchema } from '../utils';
import { isAdmin, validator, parseQuery } from '../middleware';

import { City, addCitySchema, updateCitySchema } from '../models';
import { cityController } from '../controllers';

const router = Router();

// GET
// api/cities
router.get(
  '/',
  [validator({ querySchema: featuredQuerySchema }), parseQuery(City)],
  cityController.getCities
);

// GET
// api/cities/:id
router.get('/:id', validator({ paramsSchema }), cityController.getCityById);

// POST
// api/cities
router.post('/', [isAdmin, validator({ bodySchema: addCitySchema })], cityController.addCity);

// PATCH
// api/cities/:id
router.patch(
  '/:id',
  [isAdmin, validator({ bodySchema: updateCitySchema, paramsSchema })],
  cityController.updateCityById
);

// DELETE
// api/cities/:id
router.delete('/:id', [isAdmin, validator({ paramsSchema })], cityController.deleteCity);

export default router;
