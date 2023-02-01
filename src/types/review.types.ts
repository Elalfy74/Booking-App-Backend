import { Schema } from "mongoose";

export interface IReview {
  rate: number;
  author: Schema.Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddReviewBody = {
  rate: number;
  author: Schema.Types.ObjectId;
  body: string;
};
