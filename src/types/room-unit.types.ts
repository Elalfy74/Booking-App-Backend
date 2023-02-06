import { ObjectId } from "mongoose";

export interface IRoomUnit {
  _id: string;
  hotel: ObjectId;
  room: ObjectId;
  number: number;
  unavailableDates: Date[];
  createdAt: Date;
  updatedAt: Date;
}

export type AddRoomUnitBody = {
  hotel: ObjectId;
  room: ObjectId;
  number: number;
};

export type UpdateRoomUnitBody = Omit<Partial<AddRoomUnitBody>, "hotel"> & {
  unavailableDates?: Date[];
};
