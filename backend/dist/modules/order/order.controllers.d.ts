import { IOrder } from './order.model';
import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(order: IOrder): Promise<any>;
    updateStatus(id: string, status: string): any;
    getOrders(): Promise<any[]>;
    getOrder(orderNumber: string): Promise<any>;
    deleteOrder(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
