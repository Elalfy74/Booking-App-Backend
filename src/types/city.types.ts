import { ObjectId } from 'mongoose';

export interface ICity {
  _id: string;
  name: string;
  country: ObjectId;
  photos: string[];
  isFeatured: boolean;
}

export type AddCityBody = {
  name: string;
  country: string;
  photos: string[];
  isFeatured?: boolean;
};

export type updateCityBody = Partial<AddCityBody>;
