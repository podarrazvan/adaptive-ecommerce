import { Address } from './address.interface';
import { Settings } from './settings.interface';

export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    settings: Settings;
    addresses: Address;
    favoriteProducts: string[];
    // role: 'User' | 'Admin';
    isActive: boolean;
}