import { Model } from 'mongoose';

export const isMaxFeatured = async (Model: Model<any>, max: number) => {
  const featuredNumber = await Model.count({
    isFeatured: true,
  });
  return featuredNumber === max;
};
