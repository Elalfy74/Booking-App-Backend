import { Schema } from "mongoose";

export interface IRoom {
  category: Schema.Types.ObjectId;
  number: number;
  maxPeople: number;
  desc: string;
  currentPrice: number;
  unavailableDates: { type: [Date] };
  photos: [string];
  createdAt: Date;
  updatedAt: Date;
}
