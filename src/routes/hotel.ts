import { Router } from "express";

import { featuredQuerySchema, paramsSchema } from "../utils/utils";
import { filter, isAdmin, isAuth, pagination, sort, validator } from "../middlewares";

import * as hotelController from "../controllers/hotel";
import { addHotelSchema, updateHotelSchema } from "../models/hotel/hotel-validation";
import Hotel from "../models/hotel/hotel";

const router = Router();

// GET
// api/hotel
router.get(
  "/",
  [validator({ querySchema: featuredQuerySchema }), filter, pagination(Hotel), sort],
  hotelController.getHotels
);

// GET
// api/hotel/rooms/:id
router.get("/rooms/:id", [validator({ paramsSchema })], hotelController.getRoomsOfHotel);

// GET
// api/hotel/:id
router.get("/:id", validator({ paramsSchema }), hotelController.getHotel);

// POST
// api/hotel
router.post(
  "/",
  [isAuth, isAdmin, validator({ bodySchema: addHotelSchema })],
  hotelController.addHotel
);

// PATCH
// api/hotel/:id
router.patch(
  "/:id",
  [isAuth, isAdmin, validator({ bodySchema: updateHotelSchema, paramsSchema })],
  hotelController.updateHotel
);

// DELETE
// api/hotel/:id
router.delete("/:id", [isAuth, isAdmin, validator({ paramsSchema })], hotelController.deleteHotel);

export default router;
