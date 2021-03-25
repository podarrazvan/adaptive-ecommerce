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
  rating: {
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
  model: string;
  sold: number;
}
