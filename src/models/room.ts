import mongoose, { model } from "mongoose";

export const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    unavailableDates: { type: [Date] },
  },
  { timestamps: true }
);

// const Room = model("Room", roomSchema);

// export default Room;
