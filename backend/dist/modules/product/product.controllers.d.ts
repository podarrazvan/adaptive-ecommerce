import { IProduct } from './product.model';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(product: IProduct): Promise<any>;
    updateProduct(product: IProduct): Promise<any>;
    updateSold(status: string, products: IProduct[]): Promise<void>;
    getAllProducts(): Promise<any[]>;
    getProductsByCategory(category: string): Promise<any[]>;
    getProductsById(id: string): Promise<any>;
    getPaginatedProductsByCategory(name: string, page: string, limit: string): Promise<void>;
    getPaginatedProducts(): Promise<void>;
    getLastProductsByCategory(category: string, limit: string): Promise<any[]>;
    getMainProducts(size: string): Promise<{
        products: any;
        mainAd: any;
        mainProduct: any;
    }>;
    getYouMayLike(size: string): Promise<any>;
    getFeaturedProducts(size: string): Promise<any>;
    getSpecialForYou(userId: string): Promise<void>;
    getBestSellers(): Promise<{
        main: any;
        middle: any[];
        bottom: any[];
        extra: any[];
    }>;
    getTopRated(): Promise<any>;
    deleteProduct(id: string): Promise<any>;
}
