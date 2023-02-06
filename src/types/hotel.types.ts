import { ObjectId } from "mongoose";

import { IReview } from "./review.types";
import { IRoom } from "./room.types";

export interface IHotel {
  name: string;
  desc: string;
  cheapestPrice: number;
  address: string;
  distanceToDT: number;
  category: ObjectId;
  city: ObjectId;
  photos: string[];
  // features:string[];
  noOfStars: number;
  rooms: IRoom[];
  isFeatured: boolean;
  reviews: IReview[];
}

export type AddHotelBody = {
  name: string;
  desc: string;
  address: string;
  distanceToDT: number;
  category: ObjectId;
  city: ObjectId;
  photos: string[];
  // features:string[];
  noOfStars: number;
  rooms: IRoom[];
  isFeatured?: boolean;
};

export type UpdateHotelBody = Partial<AddHotelBody> & {
  reviews?: IReview[];
};
