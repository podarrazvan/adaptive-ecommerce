import { Component, EventEmitter, Output } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/database/discount.service';

@Component({
  selector: 'app-cart-coupon',
  templateUrl: './cart-coupon.component.html',
  styleUrls: ['./cart-coupon.component.scss']
})
export class CartCouponComponent {
  @Output() discount = new EventEmitter();

  constructor(private discountService: DiscountService) { }

  addCoupon(coupon) {
    this.discountService.getCoupon(coupon.value).subscribe(response =>  {
      this.discount.emit(response);
    });
  }

}
