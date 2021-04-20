import * as mongoose from 'mongoose';

export const CouponSchema = new mongoose.Schema({
  code: { type: String, requird: true, unique: true },
  discount: { type: Number, requird: true },
});

export interface ICoupon {
  _id: string;
  code: string;
  discount: number;
}
