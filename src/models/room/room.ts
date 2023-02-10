import { model, Schema } from 'mongoose';
import { IRoom } from '../../types/room.types';

export const roomSchema = new Schema<IRoom>({
  title: {
    type: String,
    required: true,
  },
  maxPeople: {
    adults: Number,
    children: Number,
  },
  beds: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    min: 1,
    required: true,
  },
});

const Room = model('Room', roomSchema);

export default Room;
