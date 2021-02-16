import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Views {
  views: number;
}

@Injectable({providedIn: 'root'})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  websiteViews() {
    const date = new Date();

    this.getWebsiteViews(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).subscribe((response) => {
      try {
        this.addWebsiteViews(response.views);
      } catch {
        this.addWebsiteViews(0);
      }
    });
  }

  productViews() {}

  addWebsiteViews(view) {
    const date = new Date();
    const views = { views: +view + 1 };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/views/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}.json`,
        views,
        {
          observe: 'response',
        }
      )
      .subscribe();
  }

  getWebsiteViews(year, month, day) {
    return this.http.get<Views>(
      `https://shop-436e8.firebaseio.com/views/${year}/${month}/${day}.json`
    );
  }

  getAllWebsiteViews() {
    return this.http.get<any>(`https://shop-436e8.firebaseio.com/views/.json`);
  }

  getProductViews(key) {
    return this.http.get<Views>(
      `https://shop-436e8.firebaseio.com/product-views/${key}.json`
    );
  }

  addProductViews(product, category, views) {
    const productUpdated = { views: views, category: category };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/product-views/${product}.json`,
        productUpdated,
        {
          observe: 'response',
        }
      )
      .subscribe();
  }
}
