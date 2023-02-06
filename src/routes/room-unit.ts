import { Router } from "express";

import { isAuth, isAdmin, validator } from "../middlewares";
import { paramsSchema, querySchema } from "../utils/utils";

import * as RoomUnitController from "../controllers/room-unit";
import { addRoomUnitSchema, updateRoomUnitSchema } from "../models/room-unit/room-unit-validation";

const router = Router();

// GET
// api/room-units
router.get("/", [isAuth, isAdmin, validator({ querySchema })], RoomUnitController.getRoomUnits);

// GET
// api/room-units/:id
router.get("/:id", validator({ paramsSchema }), RoomUnitController.getRoomUnit);

// POST
// api/room-units
router.post(
  "/",
  [isAuth, isAdmin, validator({ bodySchema: addRoomUnitSchema })],
  RoomUnitController.addRoomUnit
);

// PATCH
// api/room-units/:id
router.patch(
  "/:id",
  [isAuth, isAdmin, validator({ bodySchema: updateRoomUnitSchema, paramsSchema })],
  RoomUnitController.updateRoomUnit
);

// DELETE
// api/room-units
router.delete(
  "/:id",
  [isAuth, isAdmin, validator({ paramsSchema })],
  RoomUnitController.deleteRoomUnit
);

export default router;
