import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { DbStatisticsService } from '../../../shared/services/database/db-statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  loading: boolean;

  showWebsite = false;

  showProducts = false;

  showOrders = false;

  continue = true;

  websiteStatistics: [
    {
      year?: number;
      month?: number;
      day?: number;
      views?: number;
    }
  ];

  productsStatistics;

  products: [{ product?: Product; views?: number }];
  productsData;
  categories: string[];
  category;

  constructor(
    private dbStatisticsService: DbStatisticsService,
    private dbGetDataService: DbGetDataService,
    private router: Router
  ) {}

  websiteWiews() {
    this.websiteStatistics = [{}];
    this.websiteStatistics.splice(0, 1);
    const date = new Date();
    const startYear = +date.getFullYear();
    let startMonth = +date.getMonth();
    let startDay = +date.getDate();
    this.dbStatisticsService.getAllWebsiteViews().subscribe((responseData) => {
      for (let year = startYear; year > 2019; year--) {
        for (let month = startMonth; month > 0; month--) {
          for (let day = startDay; day > 0; day--) {
            try {
              responseData[year][month][day].views;
              if (day === 0) {
                startDay = 31;
              }
              if (month === 0) {
                startMonth = 11;
              }
              const singleDay = {
                year: year,
                month: month + 1,
                day: day,
                views: responseData[year][month][day].views,
              };
              this.websiteStatistics.push(singleDay);
            } catch {
              break;
            }
          }
        }
      }
      this.loading = false;
    });
  }

  statisticsWebsite() {
    this.loading = true;
    this.showWebsite = !this.showWebsite;
    this.showProducts = false;
    this.showOrders = false;
    this.websiteWiews();
  }

  statisticsProducts() {
    this.loading = true;
    this.showWebsite = false;
    this.showProducts = !this.showProducts;
    this.showOrders = false;
  }

  statisticsOrders() {
    // this.loading = true;
    this.showWebsite = false;
    this.showProducts = false;
    this.showOrders = !this.showOrders;
  }

  getProducts(cat: string) {
    this.products = [{}];
    this.products.splice(0, 1);
    this.dbGetDataService
      .getProductsByCategory(cat)
      .subscribe((products) => {
        // for (let product of products) {
        //   this.dbStatisticsService
        //     .getProductViews(product.key)
        //     .subscribe((responseViews) => {
        //       this.products.push({
        //         product: product,
        //         views: responseViews.views,
        //       });
        //     });
        // }
      });
    this.loading = false;
  }

  openProduct(category: string, key: string) {
    this.router.navigate(['/product', category, key]);
  }
}
