import { Schema, model } from "mongoose";
import { IHotel } from "../../types/hotel.types";
import { reviewSchema } from "../review/review";
import { roomSchema } from "../room/room";

const HotelSchema = new Schema<IHotel>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    desc: {
      type: String,
      minlength: 4,
      maxlength: 200,
      required: true,
    },
    address: {
      type: String,
      minlength: 4,
      maxlength: 200,
      required: true,
    },
    distanceToDT: {
      type: Number,
      min: 1,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "HotelCategory",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    photos: {
      type: [String],
    },
    noOfStars: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    rooms: {
      type: [roomSchema],
      minlength: 1,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Hotel = model<IHotel>("Hotel", HotelSchema);

export default Hotel;
