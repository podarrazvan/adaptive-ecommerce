import { Component } from '@angular/core';
import { Order } from '../../../shared/interfaces/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  constructor(private ordersService: OrdersService) {
    this.getOrders();
  }

  loading = true;
  showOrder = false;
  orderToShow: Order;
  orders: Order[];
  deleteAlert: boolean;
  deleteIndex: number;

  getOrders() {
    this.orders = [];
    this.ordersService.getOrders().subscribe((response) => {
      this.orders = response;
      this.loading = false;
      this.orders = this.orders.reverse();
    });
  }

  openOrder(order: Order) {
    if (!this.deleteAlert) {
      //! you can do it better, don't emit openOrder!
      this.orderToShow = order;
      this.showOrder = true;
    }
  }

  closeOrder() {
    this.showOrder = false;
  }

  orderUpdated() {
    this.getOrders();
    this.showOrder = false;
  }

  updateOrder(status: string, order) {
    this.ordersService.updateOrder(order._id, status).subscribe();
  }

  onDelete(confirmed) {
    const order = this.orders[this.deleteIndex]._id;
    if (confirmed) {
      this.ordersService.deleteOrder(order).subscribe(() => {
        this.orders.splice(this.deleteIndex, 1);
      });
      this.deleteAlert = false;
    } else {
      this.deleteAlert = false;
    }
  }
  openDeleteAlert(index) {
    this.deleteIndex = index;
    this.deleteAlert = true;
  }
}
