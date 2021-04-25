import { Model } from 'mongoose';
import { ICoupon } from 'src/modules/coupon/coupon.model';
export declare class CouponService {
    private couponModel;
    constructor(couponModel: Model<any>);
    createCoupon(data: ICoupon): Promise<any>;
    getCoupons(): Promise<any[]>;
    getCoupon(code: string): Promise<any>;
    updateCoupon(coupon: ICoupon): Promise<any>;
    deleteCoupon(_id: string): Promise<any>;
}
