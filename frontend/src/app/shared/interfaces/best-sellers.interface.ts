import { Product } from "./product.interface";

export interface BestSellers {
    mainProduct: Product,
    middleProducts: Product[],
    bottomProducts: Product[],
    extra: Product[],
}