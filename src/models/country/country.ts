import { Schema, model } from "mongoose";
import { ICountry } from "../../types/country.types";

const countrySchema = new Schema<ICountry>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    photo: {
      type: String,
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

const Country = model<ICountry>("Country", countrySchema);

export default Country;
