import { model, Schema } from 'mongoose';
import { IRoomUnit } from '../../types/room-unit.types';

const roomUnitSchema = new Schema<IRoomUnit>(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    unavailableDates: [Date],
  },
  {
    timestamps: true,
  }
);

export const RoomUnit = model('RoomUnit', roomUnitSchema);
