import { Schema } from 'mongoose';

export interface IReview {
  rate: number;
  user: Schema.Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddReviewBody = {
  rate: number;
  user: Schema.Types.ObjectId;
  body: string;
};
