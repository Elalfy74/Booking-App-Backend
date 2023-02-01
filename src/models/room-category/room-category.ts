import { Schema, model } from "mongoose";
import { IRoomCategory } from "../../types/room-category.types";

const roomCategorySchema = new Schema<IRoomCategory>(
  {
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

    noOfBeds: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const RoomCategory = model<IRoomCategory>("RoomType", roomCategorySchema);

export default RoomCategory;
