import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart-coupon',
  templateUrl: './cart-coupon.component.html',
  styleUrls: ['./cart-coupon.component.scss']
})
export class CartCouponComponent {

  @Output() discount = new EventEmitter<number>();

  constructor(private dbFetchDataServide: DbFetchDataService) { }

  addCoupon(code) {
    this.dbFetchDataServide.fetchCoupon(code.value).subscribe(response =>  {
      this.discount.emit(response.coupon[0].discount);
    });
  }

}
