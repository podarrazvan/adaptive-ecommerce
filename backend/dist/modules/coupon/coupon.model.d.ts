import * as mongoose from 'mongoose';
export declare const CouponSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface ICoupon {
    _id: string;
    code: string;
    discount: number;
}
