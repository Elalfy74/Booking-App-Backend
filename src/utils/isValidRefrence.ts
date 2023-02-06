import { Model, ObjectId } from "mongoose";

type IsValiRefrenceParams = {
  id: ObjectId;
  Model: Model<any>;
};

export default async (params: IsValiRefrenceParams) => {
  const { id, Model } = params;

  return await Model.findById(id);
};
