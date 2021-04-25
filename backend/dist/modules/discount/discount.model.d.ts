import * as mongoose from 'mongoose';
export declare const DiscountSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface IDiscount {
    _id: string;
    cut: number;
    expirationDate: Date;
    productId: string;
    forUser?: string;
}
