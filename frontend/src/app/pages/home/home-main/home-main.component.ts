import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent {
  numberOfProducts = 4;
  products: Product[];
  mainProduct: Product;
  mainAd: Product;
  loading = true;

  constructor(private productsService: ProductsService) {
    this.productsService.getMainProducts(this.numberOfProducts).subscribe((response) => {
      this.products = response.products;
      this.mainProduct = response.mainProduct;
      this.mainAd = response.mainAd;
      this.loading = false;
    });
  }


}
