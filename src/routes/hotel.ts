import { Router } from 'express';

import { featuredQuerySchema, paramsSchema } from '../utils';
import { isAdmin, parseQuery, validator } from '../middleware';

import { hotelController } from '../controllers';
import { Hotel, addHotelSchema, updateHotelSchema } from '../models';

const router = Router();

// GET
// api/hotel
router.get(
  '/',
  [validator({ querySchema: featuredQuerySchema }), parseQuery(Hotel)],
  hotelController.getHotels
);

// GET
// api/hotel/rooms/:id
router.get('/rooms/:id', [validator({ paramsSchema })], hotelController.getRoomsOfHotel);

// GET
// api/hotel/:id
router.get('/:id', validator({ paramsSchema }), hotelController.getHotelById);

// POST
// api/hotel
router.post('/', [isAdmin, validator({ bodySchema: addHotelSchema })], hotelController.addHotel);

// PATCH
// api/hotel/:id
router.patch(
  '/:id',
  [isAdmin, validator({ bodySchema: updateHotelSchema, paramsSchema })],
  hotelController.updateHotelById
);

// DELETE
// api/hotel/:id
router.delete('/:id', [isAdmin, validator({ paramsSchema })], hotelController.deleteHotelById);

export default router;
