import { Schema } from "mongoose";

export interface IRoomUnit {
  hotel: Schema.Types.ObjectId;
  room: Schema.Types.ObjectId;
  number: number;
  unavailableDates: Date[];

  createdAt: Date;
  updatedAt: Date;
}

export type AddRoomUnitBody = Omit<
  IRoomUnit,
  "unavailableDates" | "createdAt" | "updatedAt"
>;

export type UpdateRoomUnitBody = Omit<Partial<AddRoomUnitBody>, "hotel"> & {
  unavailableDates?: Date[];
};
