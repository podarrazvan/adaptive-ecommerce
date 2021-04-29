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
  categories;

  constructor(
    private productService: ProductsService,
    public sharedDataService: SharedDataService
  ) {
    sharedDataService.layout$.subscribe((layout) => {
      const categories = layout.categories;
      this.categories = categories.slice(0, 10); // TODO get 10 categories according to the user's preferences!
      this.showProducts('Phones');
    });
  }

  showProducts(selectedCategory): void {
    this.loading = true;
    this.productService
      .getLastProducts(this.numberOfProducts, selectedCategory)
      .subscribe((response) => {
        this.products = response;
        this.loading = false;
      });
  }
}
