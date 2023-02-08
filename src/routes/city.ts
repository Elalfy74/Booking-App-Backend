import { Router } from 'express';

import { featuredQuerySchema, paramsSchema } from '../utils/utils';
import { isAdmin, validator, parseQuery } from '../middlewares';

import City from '../models/city/city';
import * as cityController from '../controllers/city';
import { addCitySchema, updateCitySchema } from '../models/city/city-validation';

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
router.get('/:id', validator({ paramsSchema }), cityController.getCity);

// POST
// api/cities
router.post('/', [isAdmin, validator({ bodySchema: addCitySchema })], cityController.addCity);

// PATCH
// api/cities/:id
router.patch(
  '/:id',
  [isAdmin, validator({ bodySchema: updateCitySchema, paramsSchema })],
  cityController.updateCity
);

// DELETE
// api/cities/:id
router.delete('/:id', [isAdmin, validator({ paramsSchema })], cityController.deleteCity);

export default router;
