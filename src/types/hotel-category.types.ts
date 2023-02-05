export interface IHotelCategory {
  name: string;
  desc: string;
}

export type AddHotelCategoryBody = IHotelCategory;

export type UpdateHotelCategoryBody = Partial<AddHotelCategoryBody>;
