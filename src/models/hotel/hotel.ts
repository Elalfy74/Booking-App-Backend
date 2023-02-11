import { Schema, model } from 'mongoose';
import { RoomUnit } from '..';

import { IHotel } from '../../types/hotel.types';
import { IRoom } from '../../types/room.types';
import { reviewSchema } from '../review/review';
import { roomSchema } from '../room/room';

const hotelSchema = new Schema<IHotel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  desc: {
    type: String,
    minlength: 4,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    default: function () {
      if (this.rooms && this.rooms.length > 0) {
        const prices: number[] = this.rooms.map((room: IRoom) => room.currentPrice);
        return Math.min.apply(null, prices);
      }
      return 0;
    },
  },
  address: {
    type: String,
    minlength: 4,
    maxlength: 200,
    required: true,
  },
  distanceToDTInKm: {
    type: Number,
    min: 1,
    required: true,
  },
  category: {
    type: String,
    enum: ['Chain hotel', 'Motel', 'Resort'],
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  rooms: {
    type: [roomSchema],
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  reviews: [reviewSchema],
});

hotelSchema.pre('findOneAndUpdate', async function (this: any) {
  const rooms: IRoom[] | undefined = this._update.rooms;

  if (rooms) {
    let roomsIds: string[] = [];

    if (rooms.length > 0) {
      const prices: number[] = rooms.map((room: IRoom) => room.currentPrice);

      this._update.cheapestPrice = Math.min.apply(null, prices);
      roomsIds = rooms.map((room) => room._id);
    } else {
      this._update.cheapestPrice = 0;
    }

    const hotelId = this.getQuery();

    await RoomUnit.deleteMany({
      hotel: hotelId,
      room: { $not: { $in: roomsIds } },
    });
  }
});

export const Hotel = model<IHotel>('Hotel', hotelSchema);
