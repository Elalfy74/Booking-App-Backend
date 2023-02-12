export type QueryFields = {
  filter?: {
    id?: string[];
  };
  range?: [number, number];
  sort?: [string, 'ASC' | 'DESC'];
  withCountry?: boolean;
  withCity?: boolean;
};

export type QueryFieldsWithFeatured = Omit<QueryFields, 'filter'> & {
  filter?: {
    id?: string[];
    isFeatured?: boolean;
  };
};
