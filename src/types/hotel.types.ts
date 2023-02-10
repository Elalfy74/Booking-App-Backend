import { ObjectId } from 'mongoose';
import { HotelCategory } from './hotel-category.types';

import { IReview } from './review.types';
import { AddRoomBody, IRoom } from './room.types';

export interface IHotel {
  name: string;
  desc: string;
  cheapestPrice: number;
  address: string;
  distanceToDTInKm: number;
  category: HotelCategory;
  city: ObjectId;
  photos: string[];
  features: string[];
  stars: number;
  rooms: IRoom[];
  isFeatured: boolean;
  reviews: IReview[];
}

export type AddHotelBody = {
  name: string;
  desc: string;
  address: string;
  distanceToDTInKm: number;
  category: HotelCategory;
  city: ObjectId;
  photos: string[];
  features: string[];
  stars: number;
  rooms: IRoom[];
  isFeatured?: boolean;
};

export type UpdateHotelBody = Omit<Partial<AddHotelBody>, 'rooms'> & {
  reviews?: IReview[];
  rooms?: AddRoomBody[];
};
