export interface Discount {
    id?: string;
    price: number;
    expirationDate: Date;
    productId: string;
}