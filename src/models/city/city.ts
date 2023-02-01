import { Schema, model } from "mongoose";
import { ICity } from "../../types/city.types";

const citySchema = new Schema<ICity>(
  {
    name: {
      type: String,
      required: true,
    },

    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    photos: {
      type: [String],
      minlength: 1,
      required: true,
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
