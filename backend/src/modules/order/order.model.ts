import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, requird: true },
  adress: { type: String, requird: true },
  city: { type: String, requird: true },
  state: { type: String, requird: true },
  zipCode: { type: String, requird: true },

  shipping: { type: String, requird: true },
  payment: { type: String, requird: true },
  total: { type: Number, requird: true },
  status: { type: String, requird: true },
  date: { type: Date, requird: true },
  awb: { type: String },

  products: [
    {
      product: { type: String, requird: true },
      quantity: { type: String, requird: true },
    },
  ],
  orderNotes: { type: String },
  orderNumber: { type: Number },
});

export interface IOrder {
  _id: string;
  name: string;
  email: string;
  adress: any;
  city: string;
  state: string;
  zipCode: string;
  shipping: string;
  payment: string;
  total: string;
  status?: string;
  date?: Date;
  products: [
    {
      product: string;
      quantity: number;
    },
  ];
  orderNotes: string;
  orderNumber: number;
  awb: string;
}
