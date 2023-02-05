import { Schema } from "mongoose";
import { IReview } from "./review.types";
import { IRoom } from "./room.types";

export interface IHotel {
  name: string;
  desc: string;
  cheapestPrice: number;
  address: string;
  distanceToDT: number;
  category: Schema.Types.ObjectId;
  city: Schema.Types.ObjectId;
  photos: string[];
  // features:string[];
  noOfStars: number;
  rooms: IRoom[];
  isFeatured: boolean;
  reviews: IReview[];
}

export type AddHotelBody = Omit<
  IHotel,
  "cheapestPrice" | "isFeatured" | "reviews"
> & {
  isFeatured?: boolean;
};

export type UpdateHotelBody = Partial<AddHotelBody> & {
  reviews?: IReview[];
};
