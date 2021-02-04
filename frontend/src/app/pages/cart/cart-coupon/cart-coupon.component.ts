
import { Component, EventEmitter, Output } from '@angular/core';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';

@Component({
  selector: 'app-cart-coupon',
  templateUrl: './cart-coupon.component.html',
  styleUrls: ['./cart-coupon.component.scss']
})
export class CartCouponComponent {

  @Output() discount = new EventEmitter<number>();

  constructor(private dbGetDataService: DbGetDataService) { }

  addCoupon(code) {
    this.dbGetDataService.getCoupon(code.value).subscribe(response =>  {
      this.discount.emit(response.discount);
    });
  }

}
