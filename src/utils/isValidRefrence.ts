import { Model, ObjectId } from 'mongoose';

type IsValidReferenceParams = {
  id: ObjectId | string;
  Model: Model<any>;
};

export default async (params: IsValidReferenceParams) => {
  const { id, Model } = params;

  return await Model.findById(id);
};
