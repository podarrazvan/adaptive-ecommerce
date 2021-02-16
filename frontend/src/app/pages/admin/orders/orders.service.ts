import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/interfaces/order.interface';

@Injectable()
export class OrdersService {
  error: any;

  constructor(private http: HttpClient) {}

  //TODO
  addOrder(order: Order) {
    const date = new Date();
    const orderToAdd = {
      cart: order.cart,
      adress: order.adress,
      total: order.total,
      status: 'new',
      date: date,
    };
    this.http
      .post(``, orderToAdd, {
        observe: 'response',
      })
      .subscribe();
  }

  updateOrder(order: Order, status: string, id: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const orderToUpdate = {
      cart: order.cart,
      adress: order.adress,
      total: order.total,
      status: status,
      date: order.date,
    };
    return this.http.put(``, orderToUpdate, {
      observe: 'response',
    });
  }

  getOrders() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const ordersArray = [];
    return this.http.get<Order[]>(``);
  }

  deleteOrder(key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(``);
  }
  ///
}
