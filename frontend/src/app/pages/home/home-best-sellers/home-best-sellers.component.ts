import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-home-best-sellers',
  templateUrl: './home-best-sellers.component.html',
  styleUrls: ['./home-best-sellers.component.scss']
})
export class HomeBestSellersComponent {
  mainProduct: Product;
  middleProducts: Product[];
  bottomProducts: Product[];
  loading = true;

  constructor(private productsService: ProductsService) {
    this.productsService.getBestSellersProducts().subscribe((response) => {
      this.mainProduct = response.main;
      this.middleProducts = response.middle;
      this.bottomProducts = response.bottom;
      this.loading = false;
    })
  }
}
