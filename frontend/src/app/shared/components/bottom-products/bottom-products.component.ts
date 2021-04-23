import { Component } from '@angular/core';
import { ProductsService } from 'src/app/pages/admin/products/products.service';
import { IProduct } from '../../interfaces/product.interface';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-bottom-products',
  templateUrl: './bottom-products.component.html',
  styleUrls: ['./bottom-products.component.scss'],
})
export class BottomProductsComponent {
  topRatedProducts: IProduct[];
  featuredProducts: IProduct[];
  topSellingProducts: IProduct[];

  constructor(
    private productsService: ProductsService,
    private sharedDataService: SharedDataService
  ) {
    this.productsService.getBestSellersProducts().subscribe((response) => {
      const bestSellers = {
        mainProduct: response.main,
        middleProducts: response.middle,
        bottomProducts: response.bottom,
        extra: response.extra,
      };
      this.sharedDataService.setBestSellers(bestSellers);
      this.topSellingProducts = bestSellers.extra;
    });

    this.productsService.getTopRatedProducts().subscribe((result) => {
      this.topRatedProducts = result;
    });

    this.productsService.getFeaturedProducts(3).subscribe((result) => {
      this.featuredProducts = result;
    });
  }
}
