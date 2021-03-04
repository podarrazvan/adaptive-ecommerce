import { Brand } from './brand.interface';
import { Categories } from './categories.interface';
import { Shipping } from './shipping.interface';

export interface Configs {
  _id?: string;
  name: string;
  categories: Categories[];
  shipping: Shipping[];
  brands: Brand[];
  footer: {
    adress: string; 
    phone: string;
    email: string;
    facebookImage: string;
    facebookUrl: string;
    twitterImage: string;
    twitterUrl: string;
    youtubeImage: string;
    youtubeUrl: string;
    instagramImage: string;
    instagramUrl: string;
  };
  
  aboutUs: string;
  termsOfUse: string;
}
