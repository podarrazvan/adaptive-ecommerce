import { IProduct } from "./product.interface";

export interface BestSellers {
    mainProduct: IProduct,
    middleProducts: IProduct[],
    bottomProducts: IProduct[],
    extra: IProduct[],
}