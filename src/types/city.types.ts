import { Schema } from "mongoose";

export interface ICity {
  name: string;
  country: Schema.Types.ObjectId;
  photos: string[];
  isFeatured: boolean;
}

export type AddCityBody = {
  name: string;
  country: Schema.Types.ObjectId;
  photos: string[];
  isFeatured?: boolean;
};

export type updateCityBody = Partial<AddCityBody>;
