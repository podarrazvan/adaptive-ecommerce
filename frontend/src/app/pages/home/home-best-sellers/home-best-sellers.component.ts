import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-home-best-sellers',
  templateUrl: './home-best-sellers.component.html',
  styleUrls: ['./home-best-sellers.component.scss'],
})
export class HomeBestSellersComponent {
  mainProduct: IProduct;
  middleProducts: IProduct[];
  bottomProducts: IProduct[];
  loading = true;

  constructor(private sharedDataService: SharedDataService) {
    setTimeout(() => {
      // TODO use something similar with layout$ and in HTML
      this.sharedDataService.bestSellers$.subscribe((response) => {
        this.mainProduct = response.mainProduct;
        this.middleProducts = response.middleProducts;
        this.bottomProducts = response.bottomProducts;
        this.loading = false;
      });
    }, 300);
  }
}
