import * as mongoose from 'mongoose';

export const DiscountSchema = new mongoose.Schema({
  cut: { type: Number, requird: true },
  expirationDate: { type: Date, requird: true },
  productId: { type: String, requird: true },
  forUser: { type: String },
});

export interface IDiscount {
  _id: string;
  cut: number;
  expirationDate: Date;
  productId: string;
  forUser?: string;
}
