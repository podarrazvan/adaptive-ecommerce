import { Brand } from './brand.interface';
import { Categories } from './categories.interface';
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
  schedule: {
    sundayStart: string,
    sundayEnd: string,
    mondayStart: string,
    mondayEnd: string,
    tuesdayStart: string,
    tuesdayEnd: string,
    wednesdayStart: string,
    wednesdayEnd: string,
    thursdaysStart: string,
    thursdaysEnd: string,
    fridayStart: string,
    fridayEnd: string,
    saturdayStart: string,
    saturdayEnd: string,
  },
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
