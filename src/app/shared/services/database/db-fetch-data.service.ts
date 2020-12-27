import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Category } from '../../interfaces/category.interface';
import { Footer } from '../../interfaces/footer.interface';
import { HomepageArea } from '../../interfaces/homepage-area.interface';
import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';

@Injectable()
export class DbFetchDataService {
  constructor(
    private http: HttpClient
  ) { }

  categories: Category[];
  category;

  fetchProductsByCategory(category: string) {
    return this.http
      .get<[Product]>(
        `http://localhost:3000/api/products/category/${category}`);
  }

  fetchProduct(key: string) {
    return this.http.get<{product: Product}>(
      `http://localhost:3000/api/products/id/${key}`
    );
  }

  fetchHomepageAreas() {
    const homepageAreasArray: HomepageArea[] = [];
    return this.http
      .get<{ key: string }>(
        `https://shop-436e8.firebaseio.com/homepage/areas/.json`
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              homepageAreasArray.push({ ...responseData[key], key });
            }
          }
          return homepageAreasArray;
        })
      );
  }

  fetchCategories() {
    const categoriesArray = [];
    return this.http
      .get<Category[]>(
        `https://shop-436e8.firebaseio.com/categories/.json`
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              categoriesArray.push({ ...responseData[key], key });
            }
          }
          return categoriesArray;
        })
      );
  }

  fetchFromCarousel() {
    const carouselArray = [];
    return this.http
      .get<{ category: string; id: string; key: string }>(
        `https://shop-436e8.firebaseio.com/homepage/carousel/.json`
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              carouselArray.push({ ...responseData[key], key });
            }
          }
          return carouselArray;
        })
      );
  }

  fetchMessages() {
    const messagesArray = [];
    return this.http
      .get<{ message: Message }>(
        `https://shop-436e8.firebaseio.com/messages/.json`
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              messagesArray.push({ ...responseData[key], key });
            }
          }
          return messagesArray;
        })
      );
  }

  fetchTermsOfUse() {
    return this.http
      .get<{ termsOfUse: string }>(`https://shop-436e8.firebaseio.com/terms-of-use/.json`);
  }

  fetchAboutUs() {
    return this.http
      .get<{ aboutUs: string }>(`https://shop-436e8.firebaseio.com/about-us/.json`);

  }

  fetchName() {
    return this.http
      .get<{ name: string }>(`https://shop-436e8.firebaseio.com/website-name/.json`);

  }

  fetchOrders() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const ordersArray = [];
    return this.http
      .get<{ order: Order }>(`https://shop-436e8.firebaseio.com/orders/.json?auth=${user._token}`)
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

  fetchFooter() {
    return this.http
      .get<{ footer: Footer }>(`https://shop-436e8.firebaseio.com/footer/.json`);

  }
}
