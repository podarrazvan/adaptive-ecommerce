import { Component } from '@angular/core';
import { DeleteAlertService } from '../../../shared/components/delete-alert/delete-alert.service';
import { Order } from '../../../shared/interfaces/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  constructor(
    private deleteAlertService: DeleteAlertService,
    private ordersService: OrdersService
  ) {
    this.getOrders();
  }

  loading = true;

  showOrder = false;
  orderToShow: Order;

  orders: Order[];

  mobileOrders = [];

  deleteAlert: boolean;

  getOrders() {
    this.orders = [];
    this.ordersService.getOrders().subscribe((response) => {
      this.orders = response;
      this.loading = false;
      this.orders = this.orders.reverse();
    });
  }

  openOrder(order: Order) {
    this.orderToShow = order;
    this.showOrder = true;
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

  onDelete(index: number) {
    this.deleteAlert = true;
    const order = this.orders[index]._id;
    this.deleteAlertService.deleteMessage.subscribe((response) => {
      switch (response) {
        case true:
          this.ordersService.deleteOrder(order).subscribe(() => {
            this.orders.splice(index, 1);
          });
          this.deleteAlert = false;
          break;
        case false:
          this.deleteAlert = false;
          break;
      }
    });
  }
}
