export interface IHotelCategory {
  name: string;
  desc: string;
}

export type AddHotelCategoryBody = {
  name: string;
  desc: string;
};

export type UpdateHotelCategoryBody = Partial<AddHotelCategoryBody>;
