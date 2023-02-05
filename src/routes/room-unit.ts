import { Router } from "express";

import { isAuth, isAdmin, validator } from "../middlewares";

import * as RoomUnitController from "../controllers/room-unit";
import {
  addRoomUnitSchema,
  updateRoomUnitSchema,
} from "../models/room-unit/room-unit-validation";

const router = Router();

// GET
// api/room-units
router.get("/", [isAuth, isAdmin], RoomUnitController.getAllRoomUnits);

// GET
// api/room-units/:id
router.get("/:id", RoomUnitController.getRoomUnit);

// POST
// api/room-units
router.post(
  "/",
  [isAuth, isAdmin, validator(addRoomUnitSchema)],
  RoomUnitController.addRoomUnit
);

// PATCH
// api/room-units/:id
router.patch(
  "/:id",
  [isAuth, isAdmin, validator(updateRoomUnitSchema)],
  RoomUnitController.updateRoomUnit
);

// DELETE
// api/room-units
router.delete("/:id", [isAuth, isAdmin], RoomUnitController.deleteRoomUnit);

export default router;
