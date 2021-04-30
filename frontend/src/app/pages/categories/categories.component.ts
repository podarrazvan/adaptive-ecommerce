import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  products: IProduct[];
  currentPage = 1;
  limit = 15;
  haveNext = true;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private discountService: DiscountService
  ) {
    this.getProducts(this.currentPage, this.limit);
  }

  previousPage(): void {
    this.currentPage--;
    this.getProducts(this.currentPage, this.limit);
  }

  nextPage(): void {
    this.currentPage++;
    this.getProducts(this.currentPage, this.limit);
  }

  getProducts(page, limit): void {
    const category = this.route.snapshot.params['category'];
    this.loading = true;
    this.productsService
      .getPaginatedProductsByCategory(page, limit, category)
      .subscribe((response) => {
        if (response.length < limit) {
          // !FIX THIS  USE SOMETHING SIMILAR WITH product.component
          this.haveNext = false;
        } else {
          this.haveNext = true;
        }
        this.loading = false;
        this.checkPrice(response);
      });
  }
  // ! THIS IS WRONG!
  checkPrice(products): void {
    this.products = [];
    for (const product of products) {
      this.discountService
        .checkForPromotion(product._id)
        .subscribe((response) => {
          let price;
          if (response != null) {
            price = product.price - response.cut;
          } else {
            price = product.price;
          }
          product.price = price;
          this.products.push(product);
        });
    }
    this.loading = false;
  }
  // !
}
