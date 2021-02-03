import { environment } from './../../../../environments/environment';
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
export class DbFetchDataService {
  constructor(private http: HttpClient) {}

  categories: string[];
  category;

  fetchProductsByCategory(category: string) {
    return this.http.get<{message: string, products: Product[]}>(
      `${environment.api}/products/category/${category}`
    );
  }

  fetchProduct(key: string) {
    return this.http.get<{ product: Product }>(
      `${environment.api}/products/id/${key}`
    );
  }

  fetchProducts() {
    return this.http.get<{message: string, products: Product[]}>(
      `${environment.api}/products`
    );
  }

  fetchPaginatedProducts(page: number, limit: number) {
    return this.http.get<{results: Product[]}>(
      `${environment.api}/products/paginated?page=${page}&limit=${limit}`
    );
  }

  fetchPromotions() {
    return this.http.get<Discount[]>(
      `${environment.api}/discount`);
  }

  fetchMessages() {
    return this.http.get<{messages: Message []}>(`${environment.api}/contact`);
  }

  fetchTermsOfUse() {
    return this.http.get<{ termsOfUse: string }>(
      `https://shop-436e8.firebaseio.com/terms-of-use/.json`
    );
  }

  fetchAboutUs() {
    return this.http.get<{ aboutUs: string }>(
      `https://shop-436e8.firebaseio.com/about-us/.json`
    );
  }

  fetchName() {
    return this.http.get<{ name: string }>(
      `https://shop-436e8.firebaseio.com/website-name/.json`
    );
  }

  fetchOrders() {
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

  fetchUsers() {
    const usersArray = [];
    return this.http
      .get<{ message: string; users: User[] }>(
        'http://localhost:3000/api/users'
      )
      .pipe(
        map((responseData) => {
          for (const user of responseData.users) {
            usersArray.push({ user });
          }
          return usersArray;
        })
      );
  }

  fetchCoupon(code) {
    return this.http.get<{coupon: Coupon[]}>(`http://localhost:3000/api/coupons/${code}`);
  }
}

