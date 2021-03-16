import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-special-for-you',
  templateUrl: './special-for-you.component.html'
})
export class SpecialForYouComponent {
  productsFound = false;
  products: Product[] = [];

  constructor(private productsService: ProductsService,private discountService: DiscountService) { 
    this.productsService.getSpecialForYouProducts().subscribe(()=>{
      this.discountService.getPromotions().subscribe(response => {
        for(let promotion of response) {
          const promo = {
            price: promotion.price,
            expirationDate: promotion.expirationDate
          }
          this.getProducts(promotion.productId, promo);
        }
      })
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