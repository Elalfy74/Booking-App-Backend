import { model, Schema } from "mongoose";
import { IRoom } from "../../types/room.types";

export const roomSchema = new Schema<IRoom>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    maxPeople: {
      type: Number,
      min: 1,
      required: true,
    },
    desc: {
      type: String,
      minlength: 4,
      maxlength: 200,
      required: true,
    },
    currentPrice: {
      type: Number,
      min: 1,
      required: true,
    },
    unavailableDates: { type: [Date] },
    photos: [String],
  },
  { timestamps: true }
);

const Room = model("Room", roomSchema);

export default Room;
