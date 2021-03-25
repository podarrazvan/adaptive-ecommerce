import { IProductModel } from "./product-model.interface";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  quantity: number;
  images: any;
  thumbnail: string;
  mainImg?: string;
  rating: { //TODO use iterface!
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
}
