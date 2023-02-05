import { Schema } from "mongoose";

export interface IRoom {
  title: string;
  // category: Schema.Types.ObjectId;
  maxPeople: number;
  beds: number;
  desc: string;
  currentPrice: number;
  photos: string[];
}
