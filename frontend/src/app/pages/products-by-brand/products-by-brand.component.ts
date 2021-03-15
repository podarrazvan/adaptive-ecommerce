import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-products-by-brand',
  templateUrl: './products-by-brand.component.html',
  styleUrls: ['./products-by-brand.component.scss']
})
export class ProductsByBrandComponent {
  loading = true;
  products: Product[];
  page = 1;
  productsOnPage = 20;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
    const brand = this.route.snapshot.params['brand'];
    this.productsService.getPaginatedProductsByBrand(this.page, this.productsOnPage, brand).subscribe((response)=> {
      this.products = response;
      this.loading = false;
    })
   }

}
