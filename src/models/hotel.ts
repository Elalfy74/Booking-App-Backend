import { Schema, model } from "mongoose";
import { roomSchema } from "./room";

const HotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: [roomSchema],
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      rating: { type: Number, min: 0, max: 5, required: true },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const Hotel = model("Hotel", HotelSchema);

export default Hotel;
