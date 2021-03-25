import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-products-by-brand',
  templateUrl: './products-by-brand.component.html',
  styleUrls: ['./products-by-brand.component.scss']
})
export class ProductsByBrandComponent {
  loading = true;
  products: IProduct[];

  productsOnPage = 6;
  currentPage = 1;
  haveNext = true;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
    this.getProducts(this.currentPage, this.productsOnPage);
   }

   getProducts(page, limit) {
    const brand = this.route.snapshot.params['brand'];
    this.productsService.getPaginatedProductsByBrand(page, limit, brand).subscribe((response)=> {
        if (response.length < limit) { //!FIX THIS  USE SOMETHING SIMILAR WITH product.component
          this.haveNext = false;
        } else {
          this.haveNext = true;
        }
        this.loading = false;
        this.products = response;
      });
  }

   previousPage() {
    this.currentPage--;
    this.getProducts(this.currentPage, this.productsOnPage);
  }

  nextPage() {
    this.currentPage++;
    this.getProducts(this.currentPage, this.productsOnPage);
  }

}
