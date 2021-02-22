import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { Coupon } from '../../../../shared/interfaces/coupon.interface';

@Component({
  selector: 'app-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss']
})
export class CouponsEditComponent implements OnInit {

  @Input() coupons: Coupon[] = [];
  @Output() newCoupons = new EventEmitter<Coupon[]>();

  constructor(private discountService: DiscountService) { }

  couponsArray: Coupon[];

  couponsHide = true;

  editCouponMode: number;

  ngOnInit(): void {
    this.couponsArray = this.coupons;
  }

  addNewValue(coupon) {
    this.coupons.push(coupon.value);
    this.newCoupons.emit(this.coupons);
    this.discountService.createCoupon(coupon.value);
  }

  delete(index) {

  }

  edit(index) {

  }

}
