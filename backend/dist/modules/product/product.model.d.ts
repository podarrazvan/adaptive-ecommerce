import * as mongoose from 'mongoose';
import { IProductModel } from 'src/shared/interfaces/product-model.interface';
export declare const ProductSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface IProduct {
    title: string;
    shortDescription: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    quantity: number;
    images: any;
    thumbnail: string;
    mainImg?: string;
    rating: {
        average: number;
        fiveStars: number;
        forStars: number;
        oneStar: number;
        threeStars: number;
        twoStars: number;
    };
    _id?: string;
    discount?: {
        cut: number;
        expirationDate: Date;
    };
    cut?: number;
    minPrice: number;
    salesWeekTarget: number;
    initialQuantity: number;
    views: number;
    productNumber: number;
    brand: string;
    productModels: IProductModel;
    sold: number;
    public: boolean;
}
