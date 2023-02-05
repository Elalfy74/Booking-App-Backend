export interface ICountry {
  name: string;
  photo: string;
  isFeatured: boolean;
}

export type AddCountryBody = {
  name: string;
  photo: string;
  isFeatured?: boolean;
};

export type updateCountryBody = Partial<AddCountryBody>;
