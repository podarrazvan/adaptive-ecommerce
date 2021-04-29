import { Address } from './address.interface';

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  addresses?: Address;
  favorites?: string[];
  history: string[];
  lastVisit: Date;
  categories: string[];
  isActive?: boolean;
  token?: string;
}
