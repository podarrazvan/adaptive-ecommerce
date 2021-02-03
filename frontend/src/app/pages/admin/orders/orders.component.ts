import { Component, OnInit } from '@angular/core';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';
import { DeleteAlertService } from '../../../shared/components/delete-alert/delete-alert.service';
import { Order } from '../../../shared/interfaces/order.interface';
import { Product } from '../../../shared/interfaces/product.interface';
import { DbDeleteService } from '../../../shared/services/database/db-delete.service';
import { DbUploadService } from '../../../shared/services/database/db-upload.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private dbGetDataService: DbGetDataService,
    private dbDeleteService: DbDeleteService,
    private deleteAlertService: DeleteAlertService,
    private sharedDataService: SharedDataService,
    private dbUploadService: DbUploadService
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
    this.dbGetDataService.getOrders().subscribe((orders) => {
      for (let order of orders) {
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
          this.mobileOrder.products.splice(0, 1);
          for (let prod of order.cart) {
            this.dbGetDataService
              .getProduct(prod.product)
              .subscribe((mobOrder) => {
                product.product = mobOrder.product;
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
    this.dbUploadService.updateOrder(order, status, order.key).subscribe();
    if (status === 'canceled') {
      alert("Please don't forget to refund the money!");
    }
  }

  onDelete(index: number) {
    this.deleteAlert = true;
    const order = this.mobile
    ? this.mobileOrders[index].key
    : this.orders[index].key;
    this.deleteAlertService.deleteMessage.subscribe((data) => {
      switch (data) {
        case true:
          this.dbDeleteService.deleteOrder(order).subscribe(() => {
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
