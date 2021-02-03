import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { DbFetchDataService } from '../../../shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-flesh-deals',
  templateUrl: './flesh-deals.component.html',
  styleUrls: ['./flesh-deals.component.scss']
})
export class FleshDealsComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) { }

  products:Product[] = [];

  productsFound = false;

  ngOnInit(): void {
    this.dbFetchDataService.fetchPromotions().subscribe(responseData => {
      for(let promotion of responseData) {
        const promo = {
          price: promotion.price,
          expirationDate: promotion.expirationDate
        }
        this.getProducts(promotion.productId, promo);
      }
    })
  }

  getProducts(id,discount) {
    this.dbFetchDataService.fetchProduct(id).subscribe(responseData => {
      const product = Object.assign(responseData.product[0], {discount: discount});
      this.products.push(product);
      if(this.products.length > 3) {
        this.productsFound = true;
      }
      });
  }

}
