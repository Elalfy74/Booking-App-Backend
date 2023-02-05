import { Router } from "express";

import { isAdmin, isAuth, validator } from "../middlewares";

import * as hotelController from "../controllers/hotel";
import { addHotelSchema } from "../models/hotel/hotel-validation";

const router = Router();

// GET
// api/hotel
router.get("/", hotelController.getAllHotelsOrFeatured);

// GET
// api/hotel/rooms/:id
router.get("/rooms/:id", hotelController.getRoomsOfHotel);

// GET
// api/hotel/:id
router.get("/:id", hotelController.getHotel);

// POST
// api/hotel
router.post(
  "/",
  [isAuth, isAdmin, validator(addHotelSchema)],
  hotelController.addHotel
);

// PATCH
// api/hotel/:id
router.patch("/:id", [isAuth, isAdmin], hotelController.updateHotel);

// DELETE
// api/hotel/:id
router.delete("/:id", [isAuth, isAdmin], hotelController.deleteHotel);

export default router;
