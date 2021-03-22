import { Component } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-shop-by-brand',
  templateUrl: './shop-by-brand.component.html',
  styleUrls: ['./shop-by-brand.component.scss']
})
export class ShopByBrandComponent {
  brands: Brand[];
  selectedBrandIndex = 0;
  page = 1;
  pageLimit = 4;
  selectedBrand: Brand;
  products: Product[];
  
  constructor(private sharedDataService: SharedDataService, private productsService: ProductsService) {
    this.sharedDataService.layout$.subscribe((response)=> {
      if(response.brands.length>0){
        this.brands = response.brands;
        this.selectedBrand = this.brands[0];
        this.getProducts(this.selectedBrand.name);
      }
    })
  }

  selected(index) {
    this.selectedBrand = this.brands[index];
    this.getProducts(this.selectedBrand.name);
  }

  getProducts(name) {
    this.productsService.getPaginatedProductsByBrand(this.page, this.pageLimit, name).subscribe((response)=> {
      this.products = response
    })
  }
}
