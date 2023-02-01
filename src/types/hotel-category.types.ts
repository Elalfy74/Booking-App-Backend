export interface IHotelCategory {
  name: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddHotelCategoryBody = {
  name: string;
  desc: string;
};
