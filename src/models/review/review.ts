import { Schema, model } from "mongoose";

import { IReview } from "../../types/review.types";

export const reviewSchema = new Schema<IReview>({
  rate: { type: Number, min: 0, max: 5, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

// const Review = model<IReview>("Review", reviewSchema);

// export default Review;
