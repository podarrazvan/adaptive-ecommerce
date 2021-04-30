import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-flesh-deals',
  templateUrl: './flesh-deals.component.html',
  styleUrls: ['./flesh-deals.component.scss'],
})
export class FleshDealsComponent implements OnInit {
  constructor(
    private discountService: DiscountService,
    private productsService: ProductsService
  ) {}

  products: IProduct[] = [];

  productsFound = false;

  ngOnInit(): void {
    this.discountService.getPromotions().subscribe((response) => {
      for (const promotion of response) {
        const promo = {
          cut: promotion.cut,
          expirationDate: promotion.expirationDate,
        };
        this.getProducts(promotion.productId, promo);
      }
    });
  }

  getProducts(id, discount): void {
    this.productsService.getProduct(id).subscribe((response) => {
      const product = Object.assign(response, { discount });
      this.products.push(product);
      if (this.products.length > 3) {
        this.productsFound = true;
      }
    });
  }
}
