import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from 'src/app/shared/services/database/statistics.service';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { ProductsService } from '../products/products.service';

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

  products: [{ product?: IProduct; views?: number }];
  productsData;
  categories: string[];
  category;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  websiteWiews(): void {}

  statisticsWebsite(): void {
    this.loading = true;
    this.showWebsite = !this.showWebsite;
    this.showProducts = false;
    this.showOrders = false;
    this.websiteWiews();
  }

  statisticsProducts(): void {
    this.loading = true;
    this.showWebsite = false;
    this.showProducts = !this.showProducts;
    this.showOrders = false;
  }

  statisticsOrders(): void {
    this.showWebsite = false;
    this.showProducts = false;
    this.showOrders = !this.showOrders;
  }

  getProducts(cat: string): void {
    this.products = [{}];
    this.products.splice(0, 1);
    this.productsService.getProductsByCategory(cat).subscribe((products) => {
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

  openProduct(category: string, key: string): void {
    this.router.navigate(['/product', category, key]);
  }
}
