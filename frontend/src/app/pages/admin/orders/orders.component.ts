import { Component, OnInit } from '@angular/core';
import { DeleteAlertService } from '../../../shared/components/delete-alert/delete-alert.service';
import { Order } from '../../../shared/interfaces/order.interface';
import { Product } from '../../../shared/interfaces/product.interface';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { ProductsService } from '../products/products.service';
import { OrdersService } from './orders.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private deleteAlertService: DeleteAlertService,
    private sharedDataService: SharedDataService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  loading = true;

  mobile: boolean;

  canceled = 'canceled';
  New = 'new';
  processed = 'processed';

  showOrder = false;
  orderToShow: Order;

  orders: Order[];

  mobileOrder: {
    cart?: any;
    key?: string;
    adress?: string;
    status?: string;
    name?: string;
    date?: Date;
    total?: string;
    products?: [
      {
        product?: Product;
        quantity?: string;
      }
    ];
  };

  mobileOrders = [];

  deleteAlert: boolean;

  ngOnInit(): void {
    this.mobile = this.sharedDataService.mobile;
    this.getOrders();
  }

  getOrders() {
    this.orders = [];
    this.ordersService.getOrders().subscribe((response) => {
      for (let order of response) {
        if (this.mobile) {
          this.mobileOrder = {};
          let product: {
            product?: Product;
            quantity?: string;
          };
          product = {};
          this.mobileOrder.cart = order.cart;
          this.mobileOrder.key = order.key;
          this.mobileOrder.adress = order.adress;
          this.mobileOrder.status = order.status;
          this.mobileOrder.name = order.adress.name;
          this.mobileOrder.date = order.date;
          this.mobileOrder.total = order.total;
          this.mobileOrder.products = [{}];
          for (let prod of order.cart) {
            this.productsService
              .getProduct(prod.product)
              .subscribe((response) => {
                product.product = response;
                product.quantity = prod.quantity;
                this.mobileOrder.products.push(product);
              });
          }
        }
        this.mobile
          ? this.mobileOrders.push(this.mobileOrder)
          : this.orders.push(order);
      }
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
    this.ordersService.updateOrder(order, status, order.key).subscribe();
    if (status === 'canceled') {
      alert("Please don't forget to refund the money!");
    }
  }

  onDelete(index: number) {
    this.deleteAlert = true;
    const order = this.mobile
    ? this.mobileOrders[index].key
    : this.orders[index].key;
    this.deleteAlertService.deleteMessage.subscribe((response) => {
      switch (response) {
        case true:
          this.ordersService.deleteOrder(order).subscribe(() => {
            this.mobile
              ? this.mobileOrders.splice(index, 1)
              : this.orders.splice(index, 1);
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
