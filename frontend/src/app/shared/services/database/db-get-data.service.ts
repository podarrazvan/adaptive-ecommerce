import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';
import { User } from '../../interfaces/user.interface';
import { Coupon } from '../../interfaces/coupon.interface';
import { Message } from '../../interfaces/message.interface';
import { Discount } from '../../interfaces/discount.interface';

@Injectable()
export class DbGetDataService {
  constructor(private http: HttpClient) {}

  categories: string[];
  category;

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(
      `${environment.api}/products/category/${category}`
    );
  }

  getProduct(key: string) {
    return this.http.get<Product>(
      `${environment.api}/products/id/${key}`
    );
  }

  getProducts() {
    return this.http.get<Product[]>(
      `${environment.api}/products`
    );
  }

  getPaginatedProducts(page: number, limit: number) {
    return this.http.get<Product[]>(
      `${environment.api}/products/paginated?page=${page}&limit=${limit}`
    );
  }

  getPromotions() {
    return this.http.get<Discount[]>(
      `${environment.api}/discount`);
  }

  getMessages() {
    return this.http.get<Message[]>(`${environment.api}/contact`);
  }
  
  getOrders() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const ordersArray = [];
    return this.http
      .get<{ order: Order }>(
        `https://shop-436e8.firebaseio.com/orders/.json?auth=${user._token}`
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              ordersArray.push({ ...responseData[key], key });
            }
          }
          return ordersArray;
        })
      );
  }

  getUsers() {
    const usersArray = [];
    return this.http
      .get<User[]>(
        'http://localhost:3000/api/users'
      )
      .pipe(
        map((responseData) => {
          for (const user of responseData) {
            usersArray.push({ user });
          }
          return usersArray;
        })
      );
  }

  getCoupon(code) {
    return this.http.get<Coupon>(`http://localhost:3000/api/coupons/${code}`);
  }
}

