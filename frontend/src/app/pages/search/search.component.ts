import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { StatisticsService } from 'src/app/shared/services/database/statistics.service';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  urlData: { search: string[]; category: string };
  productsData;
  category;
  pages: Product[][] = [];

  limit = 15;
  pageIndex = 0;
  pagesNumber = 0;

  haveNext: boolean;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private discountService: DiscountService,
    private statisticsService: StatisticsService,
  ) {
    this.urlData = {
      category: this.route.snapshot.params['category'],
      search: this.route.snapshot.params['search'].split('-'),
    };
    this.statisticsService.updateSearch(this.urlData.search.join(' ')).subscribe();
    if (this.urlData.category != 'all') {
      this.getProductsByCategory(this.urlData.category);
    } else {
      this.getAllProducts();
    }
  }

  getAllProducts() {
    let products = [];
    this.productsService.getProducts().subscribe((response) => {
      for (let product of response) {
        products.push(product);
      }
      this.filtreResult(products); //! do it in backend!
    });
  }

  getProductsByCategory(cat: string) {
    let products = [];
    this.productsService.getProductsByCategory(cat).subscribe((response) => {
      for (let product of response) {
        products.push(product);
      }
      this.filtreResult(products); //! do it in backend!
    });
  }

  filtreResult(products) {
    const search = this.urlData.search;
    const prod = [];
    for (let product of products) {
      for (let word of search) {
        if (word != '') {
          word = word.toLowerCase();
          product.title = product.title.toLowerCase();
          if (product.title.includes(word)) {
            prod.push(product);
            break;
          }
          product.description = product.description.toLowerCase();
          if (product.description.includes(word)) {
            prod.push(product);
            break;
          }
          for (let tag of product.tags) {
            tag = tag.toLowerCase();
            if (tag === word) {
              prod.push(product);
              break;
            }
          }
        }
      }
    }
    this.paginaton(prod);
  }

  //! NOT OK, FIX IT!
  paginaton(products: Product[]) {
    let index = -1;
    let productsLeft = products.length;

    productsLeft > this.limit
      ? (this.haveNext = true)
      : (this.haveNext = false);

    this.pagesNumber = Math.ceil(productsLeft / this.limit);
    for (let pageNumber = 0; pageNumber < this.pagesNumber; pageNumber++) {
      let page = [];
      let productsOnPage;

      if (productsLeft - this.limit > 0) {
        productsLeft -= this.limit;
        productsOnPage = this.limit;
           
      } else {
        productsOnPage = productsLeft;
      }

      for (let i = 0; i < productsOnPage; i++) {
        index ++;
        let product = products[index];
        //! too many requests!
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
            page.push(product);
          });
          //!
      }
      this.pages.push(page);
    }
  }
  //!

  previousPage() {
    this.pageIndex--;
    this.haveNext = true;
  }

  nextPage() {
    this.pageIndex++;
    this.pageIndex === this.pages.length - 1
      ? (this.haveNext = false)
      : (this.haveNext = true);
  }
}
