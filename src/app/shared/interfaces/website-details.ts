import { Brand } from './brand.interface';

export interface WebsiteDetails {
  _id?: string;
  name: string;
  categories: string[];
  brands: Brand[];
  adress: string;
  phone: string;
  email: string;
  program: string;
  facebookImage: string;
  facebookUrl: string;
  twitterImage: string;
  twitterUrl: string;
  youtubeImage: string;
  youtubeUrl: string;
  instagramImage: string;
  instagramUrl: string;
}
