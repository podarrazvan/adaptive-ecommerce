export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  homepagePosition?: string;
  tags: string[];
  quantity:number;
  img: any;
  thumbnail?: string;
  rating?: number;
  key?: string;
  cut?: number;
  minPrice: number,
  salesWeekTarget: number,
  views: number
}
