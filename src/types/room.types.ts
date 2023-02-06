import { ObjectId } from "mongoose";

export interface IRoom {
  _id: string;
  title: string;
  maxPeople: number;
  beds: number;
  desc: string;
  currentPrice: number;
  photos: string[];
}

export interface AddRoomBody {
  _id?: string;
  title: string;
  maxPeople: number;
  beds: number;
  desc: string;
  currentPrice: number;
  photos: string[];
}
