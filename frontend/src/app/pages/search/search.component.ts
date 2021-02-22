import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  urlData: { search: string[]; category: string };

  // products: Product[];

  products = [];
  productsData;
  categories: string[];
  category;

  ngOnInit(): void {
    this.urlData = {
      category: this.route.snapshot.params['category'],
      search: this.route.snapshot.params['search'].split('-'),
    };

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
      this.filtreResult(products);
    });
  }

  getProductsByCategory(cat: string) {
    let products = [];
    this.productsService
      .getProductsByCategory(cat)
      .subscribe((response) => {
        for (let product of response) {
          products.push(product);
        }
        this.filtreResult(products);
      });
  }

  filtreResult(products) {
    const search = this.urlData.search;
    for (let product of products) {
      for (let word of search) {
        if (word != '') {
          word = word.toLowerCase();
          product.title = product.title.toLowerCase();
          if (product.title.includes(word)) {
            this.products.push(product);
            break;
          }
          product.description = product.description.toLowerCase();
          if (product.description.includes(word)) {
            this.products.push(product);
            break;
          }
          for (let tag of product.tags) {
            tag = tag.toLowerCase();
            if (tag === word) {
              this.products.push(product);
              break;
            }
          }
        }
      }
    }
    return this.products;
  }
}
