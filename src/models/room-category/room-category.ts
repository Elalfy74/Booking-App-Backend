import { Schema, model } from "mongoose";
import { IRoomCategory } from "../../types/room-category.types";

const roomCategorySchema = new Schema<IRoomCategory>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
});

const RoomCategory = model<IRoomCategory>("RoomCategory", roomCategorySchema);

export default RoomCategory;
