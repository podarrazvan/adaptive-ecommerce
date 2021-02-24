import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductsService } from '../../admin/products/products.service';

@Component({
  selector: 'app-flesh-deals',
  templateUrl: './flesh-deals.component.html',
  styleUrls: ['./flesh-deals.component.scss']
})
export class FleshDealsComponent implements OnInit {

  constructor(private discountService: DiscountService,
              private productsService: ProductsService) { }

  products:Product[] = [];

  productsFound = false;s

  ngOnInit(): void {
    this.discountService.getPromotions().subscribe(response => {
      for(let promotion of response) {
        const promo = {
          price: promotion.price,
          expirationDate: promotion.expirationDate
        }
        this.getProducts(promotion.productId, promo);
      }
    })
  }

  getProducts(id,discount) {
    this.productsService.getProduct(id).subscribe(response => {
      const product = Object.assign(response, {discount: discount});
      this.products.push(product);
      if(this.products.length > 3) {
        this.productsFound = true;
      }
      });
  }

}