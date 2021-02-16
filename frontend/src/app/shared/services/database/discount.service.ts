import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Discount } from '../../interfaces/discount.interface';
import { Coupon } from '../../interfaces/coupon.interface';

@Injectable()
export class DiscountService {
  constructor(private http: HttpClient) {}

  createCoupon(coupon: Coupon) {
    const couponToAdd: Coupon = {
      code: coupon.code,
      discount: coupon.discount,
    };
    this.http.post(`${environment.api}/coupons`, couponToAdd).subscribe();
  }

  createDiscount(discount: Discount) {
    const discountData = {
      price: discount.price,
      expirationDate: discount.expirationDate,
      productId: discount.id,
    };
    this.http.post(`${environment.api}/discount`, discountData).subscribe();
  }

  getPromotions() {
    return this.http.get<Discount[]>(`${environment.api}/discount`);
  }

  getCoupon(code) {
    return this.http.get<Coupon>(`${environment.api}/coupons/${code}`);
  }
}
