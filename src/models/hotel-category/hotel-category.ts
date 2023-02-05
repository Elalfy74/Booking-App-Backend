import { Schema, model } from "mongoose";

import { IHotelCategory } from "../../types/hotel-category.types";

const hotelCategorySchema = new Schema<IHotelCategory>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
});

const HotelCategory = model<IHotelCategory>(
  "HotelCategory",
  hotelCategorySchema
);

export default HotelCategory;
