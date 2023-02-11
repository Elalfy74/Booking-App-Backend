import { Model, ObjectId } from 'mongoose';

type IsValidReferenceParams = {
  id: ObjectId | string;
  Model: Model<any>;
};

export const isValidReference = (params: IsValidReferenceParams) => {
  const { id, Model } = params;

  return Model.findById(id);
};
