import * as mongoose from 'mongoose';
import { IProductModel } from 'src/shared/interfaces/product-model.interface';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: Number, require: true },
  tags: [{ type: String, require: true }],
  shortDescription: { type: String, require: true },
  description: { type: String, require: true },
  thumbnail: { type: String, require: true },
  mainImg: { type: String },
  images: [{ type: String, require: true }],
  quantity: { type: Number, require: true },
  views: { type: Number, require: true },
  brand: { type: String, require: true },
  productModels: [
    {
      name: { type: String },
      price: { type: String },
    },
  ],
  autoMode: {
    minPrice: { type: Number }, // min price for auto generated offers
    salesWeekTarget: { type: Number }, // how many should be sold each week in auto mode
  },
  initialQuantity: { type: Number, require: true },
  sold: { type: Number, require: true },
  rating: {
    oneStar: { type: Number },
    twoStars: { type: Number },
    threeStars: { type: Number },
    forStars: { type: Number },
    fiveStars: { type: Number },
    average: { type: Number },
  },
  productNumber: { type: Number, require: true }, //date in seconds since midnight, 1 Jan 1970
  public: { type: Boolean, require: true },
});

export interface IProduct {
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  quantity: number;
  images: any;
  thumbnail: string;
  mainImg?: string;
  rating: {
    //TODO use iterface!
    average: number;
    fiveStars: number;
    forStars: number;
    oneStar: number;
    threeStars: number;
    twoStars: number;
  };
  _id?: string;
  //! duplicate cut!
  discount?: {
    cut: number;
    expirationDate: Date;
  };
  cut?: number;
  //!
  minPrice: number;
  salesWeekTarget: number;
  initialQuantity: number;
  views: number;
  productNumber: number;
  brand: string;
  productModels: IProductModel;
  sold: number;
  public: boolean;
}
