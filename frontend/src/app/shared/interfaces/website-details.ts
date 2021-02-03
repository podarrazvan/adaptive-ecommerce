import { Brand } from './brand.interface';
import { Shipping } from './shipping.interface';

export interface WebsiteDetails {
  _id?: string;
  name: string;
  categories: string[];
  shipping:Shipping[];
  brands: Brand[];
  footer: {
    adress: string;
    phone: string;
    email: string;
    program: string;
  }
  facebookImage: string;
  facebookUrl: string;
  twitterImage: string;
  twitterUrl: string;
  youtubeImage: string;
  youtubeUrl: string;
  instagramImage: string;
  instagramUrl: string;
  aboutUs: string;
  termsOfUse: string;
}
