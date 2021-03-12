import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-home-new-releases',
  templateUrl: './home-new-releases.component.html',
  styleUrls: ['./home-new-releases.component.scss'],
})
export class HomeNewReleasesComponent {
  products = [];
  loading = true;
  selectedCategory: string;
  numberOfProducts = 10;

  constructor(
    private productService: ProductsService,
    public sharedDataService: SharedDataService
  ) {
    //const categories = sharedDataService.layout$.categories;
    const categories = ['Phones'];
    this.showProducts(categories[0])
  }

  showProducts(selectedCategory) {
    this.productService.getLastProducts(this.numberOfProducts, selectedCategory).subscribe((response) => {
      this.products = response;
      this.loading = false;
    });
  }
}
