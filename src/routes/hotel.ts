import { Router } from "express";
import * as hotelController from "../controllers/hotel";
import validator from "../middlewares/validator";
import { addHotelSchema } from "../models/hotel/hotel-validation";

const router = Router();

// GET
// api/hotel
router.get("/", hotelController.getAllHotelsOrFeatured);

// GET
// api/hotel/:id
router.get("/:id", hotelController.getHotel);

// POST
// api/hotel
router.post("/", validator(addHotelSchema), hotelController.addHotel);

// DELETE
// api/hotel
router.delete("/:id", hotelController.deleteHotel);

export default router;
