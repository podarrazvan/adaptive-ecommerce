import { Model } from 'mongoose';
import { IProduct } from './product.model';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<any>);
    createProduct(product: IProduct): Promise<any>;
    updateProduct(product: IProduct): Promise<any>;
    updateSold(status: string, products: IProduct[]): Promise<void>;
    getProductsByCategory(category: string): Promise<any[]>;
    getProductById(_id: string): Promise<any>;
    getPaginatedProductsByCategory(category: string, page: number, limit: number): Promise<void>;
    getPaginatedProductsByBrand(brand: string, page: number, limit: number): Promise<void>;
    getPaginatedProducts(): Promise<void>;
    getLastProductsByCategory(category: string, limit: number): Promise<any[]>;
    getMainProducts(size: any): Promise<{
        products: any;
        mainAd: any;
        mainProduct: any;
    }>;
    getYouMayLike(size: number): Promise<any>;
    getFeaturedProducts(size: number): Promise<any>;
    getSpecialForYou(forUser: string): Promise<void>;
    getBestSellers(): Promise<{
        main: any;
        middle: any[];
        bottom: any[];
        extra: any[];
    }>;
    getTopRated(): Promise<any>;
    getAllProducts(): Promise<any[]>;
    deleteProduct(_id: string): Promise<any>;
}
