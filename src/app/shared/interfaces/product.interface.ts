export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  homepagePosition?: string;
  tags: string[];
  quantity:number;
  images: any;
  thumbnail?: string;
  rating?: number;
  _id?: string;
  cut?: number;
  minPrice: number;
  salesWeekTarget: number;
  views: number;
  productNumber: number;
  brand: string;
  model: string
}
