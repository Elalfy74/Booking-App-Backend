import { model, Schema } from "mongoose";
import { IRoom } from "../../types/room.types";

export const roomSchema = new Schema<IRoom>({
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: "RoomCategory",
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: Number,
    min: 1,
    required: true,
  },
  beds: {
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
  // roomNumbers: [
  //   {
  //     number: {
  //       type: Number,
  //       unique: true,
  //     },
  //     unavailableDates: { type: [Date] },
  //   },
  // ],
  photos: {
    type: [String],
    required: true,
  },
});

// const Room = model("Room", roomSchema);

// export default Room;
