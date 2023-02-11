import { Router } from 'express';

import { isAdmin, validator, parseQuery } from '../middleware';
import { paramsSchema, querySchema } from '../utils';

import { roomUnitController } from '../controllers';
import { RoomUnit, addRoomUnitSchema, updateRoomUnitSchema } from '../models';

const router = Router();

// GET
// api/room-units
router.get(
  '/',
  [validator({ querySchema }), parseQuery(RoomUnit)],
  roomUnitController.getRoomUnits
);

// GET
// api/room-units/:id
router.get('/:id', validator({ paramsSchema }), roomUnitController.getRoomUnitById);

// POST
// api/room-units
router.post(
  '/',
  [isAdmin, validator({ bodySchema: addRoomUnitSchema })],
  roomUnitController.addRoomUnit
);

// PATCH
// api/room-units/:id
router.patch(
  '/:id',
  [isAdmin, validator({ bodySchema: updateRoomUnitSchema, paramsSchema })],
  roomUnitController.updateRoomUnit
);

// DELETE
// api/room-units
router.delete('/:id', [isAdmin, validator({ paramsSchema })], roomUnitController.deleteRoomUnit);

export default router;
