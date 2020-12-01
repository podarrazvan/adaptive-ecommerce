import { Product } from './product.interface';

export interface Order {
    products?: any;
    cart: any;
    adress: any,
    total: string,
    status?: string,
    date?: Date,
    key?: string
    mobProducts?:Product[];
}