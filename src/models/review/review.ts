import { Schema } from 'mongoose';

import { IReview } from '../../types/review.types';

export const reviewSchema = new Schema<IReview>({
  rate: { type: Number, min: 1, max: 10, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
