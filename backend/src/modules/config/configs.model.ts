import * as mongoose from 'mongoose';
import { IContact } from 'src/shared/interfaces/contact.interface';

export const ConfigsSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  categories: [{ name: { type: String } }],
  brands: [
    {
      name: { type: String },
      image: { type: String },
      description: { type: String },
    },
  ],
  shipping: [
    {
      name: { type: String },
      price: { type: Number },
    },
  ],
  contact: {
    adress: { type: String },
    phone: { type: String },
    email: { type: String },
    program: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
  schedule: {
    sundayStart: { type: String },
    sundayEnd: { type: String },
    mondayStart: { type: String },
    mondayEnd: { type: String },
    tuesdayStart: { type: String },
    tuesdayEnd: { type: String },
    wednesdayStart: { type: String },
    wednesdayEnd: { type: String },
    thursdaysStart: { type: String },
    thursdaysEnd: { type: String },
    fridayStart: { type: String },
    fridayEnd: { type: String },
    saturdayStart: { type: String },
    saturdayEnd: { type: String },
  },
  aboutUs: { type: String },
  termsOfUse: { type: String },
  shippingInfo: { type: String },
  paymentInfo: { type: String },
  returnsExchange: { type: String },
  faq: { type: String },
  customerService: { type: String },
  buyerProtection: { type: String },
  help: { type: String },
});

//!not working
// export class Configs extends Document {}
//!

export interface IConfigs {
  name: string;
  categories: string[];
  brands: string;
  shipping: any;
  program: any;
  contact: IContact;
  aboutUs: string;
  termsOfUse: string;
}
