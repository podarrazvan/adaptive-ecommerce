import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
})
export class HomeMainComponent {
  numberOfProducts = 4;
  products: IProduct[];
  mainProduct: IProduct;
  mainAd: IProduct;
  loading = true;

  constructor(private productsService: ProductsService) {
    this.productsService
      .getMainProducts(this.numberOfProducts)
      .subscribe((response) => {
        if (
          response.products.length > 0 &&
          response.mainAd !== undefined &&
          response.mainProduct !== undefined
        ) {
          this.products = response.products;
          this.mainProduct = response.mainProduct;
          this.mainAd = response.mainAd;
          this.loading = false;
        }
      });
  }
}
