export interface ICity {
  name: string;
  country: string;
  numberOfHotels: number;
  photo: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AddCityBody = {
  name: string;
  country: string;
  photo: string;
};
