import { Address } from './address.interface';
import { Settings } from './settings.interface';

export interface User {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    settings?: Settings;
    addresses?: Address;
    favorites?: string[];
    history: string[];
    lastVisit: Date;
    categories: string[];
    isActive?: boolean;
    token?: string;
}