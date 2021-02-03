import { Component, OnInit } from '@angular/core';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private dbGetDataService: DbGetDataService
  ) {}

  urlData: { category: string };

  // isLoading = true;

  // products: Product[];

  products = [];
  isLoading = false;

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.products.push({
        title: 'iPhone 12 Pro Max',
        cut: -40,
        img:
          'https://s1.flanco.ro/catalog/product/cache/368/image/400x400/9df78eab33525d08d6e5fb8d27136e95/1/4/143545_2_1.jpg',
        price: 999,
      });
      this.products.push({
        title: 'iPhone 12 Pro Max',
        img:
          'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSYyf_q2kgES_sP7wJVVdmv27TY3xa2lJSrcQ6TUBQk10ORSyLDtHre_Ig4wvI&usqp=CAc',
        price: 999,
      });
    }

    // this.urlData = {
    //   category: this.route.snapshot.params['category'],
    // };
    // this.getProducts(this.urlData.category);
  }

  getProducts(category: string) {
    this.products = [];
    this.dbGetDataService
      .getProductsByCategory(category)
      .subscribe((response) => {
        for (let product of response.products) {
          this.products.push(product);
        }
        this.isLoading = false;
      });
  }
}
