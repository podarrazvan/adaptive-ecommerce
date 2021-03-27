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
    return this.http.post(`${environment.api}/coupons`, couponToAdd);
  }

  getCoupon(code) {
    return this.http.get<Coupon>(`${environment.api}/coupons/${code}`);
  }

  getCoupons() {
    return this.http.get<Coupon[]>(`${environment.api}/coupons`);
  }

  editCoupon(coupon){
    return this.http.put(`${environment.api}/coupons`,coupon);
  }

  deleteCoupon(id){
    return this.http.delete(`${environment.api}/coupons/${id}`);
  }

  createDiscount(discount: Discount) {
    const discountData = {
      cut: discount.cut,
      expirationDate: discount.expirationDate,
      productId: discount.id,
    };
    this.http.post(`${environment.api}/discount`, discountData).subscribe();
  }

  getPromotions() {
    return this.http.get<Discount[]>(`${environment.api}/discount`);
  }

  checkForPromotion(product) {
    return this.http.get<Discount>(`${environment.api}/discount/by-product/${product}`);
  }

  checkAuthForPromotion(product) {//! send user _id too!
    return this.http.get<Discount[]>(`${environment.api}/discount/by-product/auth/${product}`);
  }
}
