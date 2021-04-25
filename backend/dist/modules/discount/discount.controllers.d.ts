import { IDiscount } from './discount.model';
import { DiscountService } from './discount.service';
export declare class DiscountController {
    private discountService;
    constructor(discountService: DiscountService);
    createDiscount(discount: IDiscount): Promise<any>;
    getDiscountByProduct(product: string): any;
    getDiscountByProductAuthUSer(product: string): Promise<any>;
    updateDiscount(discount: IDiscount): any;
}
