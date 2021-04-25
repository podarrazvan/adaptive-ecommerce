import * as mongoose from 'mongoose';
export declare const OrderSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface IOrder {
    _id: string;
    name: string;
    email: string;
    adress: any;
    city: string;
    state: string;
    zipCode: string;
    shipping: string;
    payment: string;
    total: string;
    status?: string;
    date?: Date;
    products: [
        {
            product: string;
            quantity: number;
        }
    ];
    orderNotes: string;
    orderNumber: number;
    awb: string;
}
