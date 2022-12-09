import { Schema, model } from "mongoose";
import { ICity } from "../../types/city.types";

const citySchema = new Schema<ICity>(
  {
    name: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: true,
    },

    numberOfHotels: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const City = model<ICity>("City", citySchema);

export default City;
