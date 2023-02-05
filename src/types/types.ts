export type QueryFields = {
  filter?: {
    id?: string[];
    isFeatured?: boolean;
  };
  range?: [number, number];
  sort?: [string, "ASC" | "DESC"];
  withCountry?: boolean;
};
