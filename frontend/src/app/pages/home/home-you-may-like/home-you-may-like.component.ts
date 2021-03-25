import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-home-you-may-like',
  templateUrl: './home-you-may-like.component.html',
  styleUrls: ['./home-you-may-like.component.scss']
})
export class HomeYouMayLikeComponent {
  products: IProduct[];
  numberOfProducts = 6;
  loading = true;

  constructor(private productsService: ProductsService) {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getYouMayLikeProducts(this.numberOfProducts).subscribe((response) => {
      this.products = response;
      this.loading = false;
    });
  }
}
