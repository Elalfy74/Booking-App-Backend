import { Schema, model } from "mongoose";

import { IHotel } from "../../types/hotel.types";
import { IRoom } from "../../types/room.types";
import { reviewSchema } from "../review/review";
import { roomSchema } from "../room/room";

const hotelSchema = new Schema<IHotel>({
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
  cheapestPrice: {
    type: Number,
    default: function () {
      const prices: number[] = this.rooms.map((room: IRoom) => room.currentPrice);
      return Math.min.apply(null, prices);
    },
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
    required: true,
  },
  noOfStars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  rooms: {
    type: [roomSchema],
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  reviews: [reviewSchema],
});

hotelSchema.pre("update", function (this: IHotel, next) {
  const prices: number[] = this.rooms.map((room: IRoom) => room.currentPrice);
  this.cheapestPrice = Math.min.apply(null, prices);
});

const Hotel = model<IHotel>("Hotel", hotelSchema);

export default Hotel;
