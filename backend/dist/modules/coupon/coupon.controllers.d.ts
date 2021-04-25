import { ICoupon } from './coupon.model';
import { CouponService } from './coupon.service';
export declare class CouponController {
    private couponService;
    constructor(couponService: CouponService);
    createCoupon(data: ICoupon): Promise<any>;
    getCoupons(): Promise<any[]>;
    getCoupon(code: string): Promise<any>;
    updateCoupon(data: ICoupon): Promise<any>;
    deleteCoupon(id: string): Promise<any>;
}
