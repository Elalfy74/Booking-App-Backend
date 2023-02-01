export interface IRoomCategory {
  name: string;
  desc: string;
  noOfBeds: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AddRoomCategoryBody = {
  name: string;
  desc: string;
  noOfBeds: number;
};
