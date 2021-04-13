import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { ProductsService } from '../admin/products/products.service';

@Component({
  selector: 'app-special-for-you',
  templateUrl: './special-for-you.component.html'
})
export class SpecialForYouComponent {
  productsFound = false;
  products: IProduct[] = [];

  constructor(private productsService: ProductsService,private discountService: DiscountService) {
    this.productsService.getSpecialForYouProducts().subscribe((response)=>{
      // this.discountService.getPromotions().subscribe(response => {
        console.log(response)
        for(let promotion of response) {
          const promo = {
            cut: promotion.cut,
            expirationDate: promotion.expirationDate
          }
          this.getProducts(promotion.productId, promo);
        }
      })
    //})
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
