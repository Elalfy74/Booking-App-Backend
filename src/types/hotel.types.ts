import { Schema } from "mongoose";
import { IReview } from "./review.types";
import { IRoom } from "./room.types";

export interface IHotel {
  name: string;
  desc: string;
  address: string;
  distanceToDT: number;
  category: Schema.Types.ObjectId;
  city: Schema.Types.ObjectId;
  photos: [string];
  noOfStars: number;
  rooms: [IRoom];
  isFeatured: boolean;
  reviews: [IReview];
  createdAt: Date;
  updatedAt: Date;
}

export type AddHotelBody = {
  name: string;
  desc: string;
  address: string;
  distanceToDT: number;
  category: Schema.Types.ObjectId;
  city: Schema.Types.ObjectId;
  photos: [string];
  noOfStars: number;
  rooms: [IRoom];
  isFeatured?: boolean;
};
