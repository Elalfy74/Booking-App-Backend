import { Schema } from "mongoose";

const passionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});
