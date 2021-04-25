import { Model } from 'mongoose';
import { IDiscount } from './discount.model';
export declare class DiscountService {
    private discountModel;
    constructor(discountModel: Model<any>);
    createDiscount(discount: IDiscount): Promise<any>;
    getDiscounts(): Promise<any[]>;
    getDiscountByProduct(productId: string): Promise<any>;
    getDiscountByProductAuthUSer(productId: string, forUser: string): Promise<any>;
    updateDiscount(discount: IDiscount): Promise<any>;
}
