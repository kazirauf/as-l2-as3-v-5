import { Types } from 'mongoose';

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'cancelled';
};

export type TSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};
