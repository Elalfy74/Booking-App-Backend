import { model, Schema } from "mongoose";
import { IRoomUnit } from "../../types/room-unit.types";

export const roomUnitSchema = new Schema<IRoomUnit>(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    unavailableDates: [Date],
  },
  {
    timestamps: true,
  }
);

const RoomUnit = model("RoomUnit", roomUnitSchema);

export default RoomUnit;
