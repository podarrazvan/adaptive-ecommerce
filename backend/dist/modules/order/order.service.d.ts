import { Model } from 'mongoose';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<any>);
    createOrder(order: any): Promise<any>;
    updateStatus(_id: string, status: string): Promise<any>;
    getOrders(): Promise<any[]>;
    getOrder(orderNumber: string): Promise<any>;
    deleteOrder(_id: any): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
