import { Brand } from './brand.interface';
import { Categories } from './categories.interface';
import { ISchedule } from './schedule.interface';
import { Shipping } from './shipping.interface';

export interface Layout {
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
  schedule: ISchedule;
  aboutUs: string;
  termsOfUse: string;
  shippingInfo: string;
  paymentInfo: string;
  returnsExchange: string;
  faq: string;
  customerService: string;
  buyerProtection: string;
  help: string;
}
