export interface ICountry {
  name: string;
  photo: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AddCountryBody = {
  name: string;
  photo: string;
  isFeatured?: boolean;
};

export type updateCountryBody = Partial<AddCountryBody>;
