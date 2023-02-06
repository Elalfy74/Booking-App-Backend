import { Router } from "express";

import { filter, isAdmin, isAuth, pagination, sort, validator } from "../middlewares";

import * as hotelController from "../controllers/hotel";
import { addHotelSchema } from "../models/hotel/hotel-validation";
import City from "../models/city/city";
import { featuredQuerySchema } from "../utils/utils";

const router = Router();

// GET
// api/hotel
router.get(
  "/",
  [validator({ querySchema: featuredQuerySchema }), filter, pagination(City), sort],
  hotelController.getHotels
);

// GET
// api/hotel/rooms/:id
router.get("/rooms/:id", hotelController.getRoomsOfHotel);

// GET
// api/hotel/:id
router.get("/:id", hotelController.getHotel);

// POST
// api/hotel
router.post("/", [isAuth, isAdmin, validator(addHotelSchema)], hotelController.addHotel);

// PATCH
// api/hotel/:id
router.patch("/:id", [isAuth, isAdmin], hotelController.updateHotel);

// DELETE
// api/hotel/:id
router.delete("/:id", [isAuth, isAdmin], hotelController.deleteHotel);

export default router;
