import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/interfaces/order.interface';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  error: any;

  constructor(private http: HttpClient) {}

  addOrder(order: Order): any {
    return this.http.post<{ message: string; order: Order }>(
      `${environment.api}/order`,
      order,
      {
        observe: 'response',
      }
    );
  }

  updateOrder(id: string, status: string): any {
    return this.http.put(`${environment.api}/order/update/${id}/${status}`, {
      observe: 'response',
    });
  }

  updateAWB(id: string, awb: string): any {
    return this.http.put(`${environment.api}/order/update/awb/${id}/${awb}`, {
      observe: 'response',
    });
  }

  getOrders(): any {
    return this.http.get<Order[]>(`${environment.api}/order`);
  }

  getOrder(orderNumber): any {
    return this.http.get<Order>(`${environment.api}/order/${orderNumber}`);
  }

  deleteOrder(id: string): any {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(`${environment.api}/order/delete/${id}`);
  }
}
