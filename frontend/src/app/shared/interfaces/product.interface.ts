export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  quantity: number;
  images: any;
  thumbnail: string;
  mainImg?: string;
  rating?: number;
  _id?: string;
  //! duplicate cut! 
  discount?: {
    cut: number;
    expirationDate: Date;
  }
  cut?: number;
  //!
  minPrice: number;
  salesWeekTarget: number;
  initialQuantity: number;
  views: number;
  productNumber: number;
  brand: string;
  model: string;
  sold: number;
}
