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
}
