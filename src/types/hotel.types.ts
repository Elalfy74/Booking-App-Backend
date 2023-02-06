import { ObjectId } from "mongoose";

import { IReview } from "./review.types";
import { AddRoomBody, IRoom } from "./room.types";

export interface IHotel {
  [x: string]: any;
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

export type UpdateHotelBody = Omit<Partial<AddHotelBody>, "rooms"> & {
  reviews?: IReview[];
  rooms?: AddRoomBody[];
};
