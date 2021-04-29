import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Discount } from '../../interfaces/discount.interface';
import { Coupon } from '../../interfaces/coupon.interface';

@Injectable()
export class DiscountService {
  constructor(private http: HttpClient) {}

  createCoupon(coupon: Coupon): any {
    const couponToAdd: Coupon = {
      code: coupon.code,
      discount: coupon.discount,
    };
    return this.http.post(`${environment.api}/coupons`, couponToAdd);
  }

  getCoupon(code): any {
    return this.http.get<Coupon>(`${environment.api}/coupons/${code}`);
  }

  getCoupons(): any {
    return this.http.get<Coupon[]>(`${environment.api}/coupons`);
  }

  editCoupon(coupon): any {
    return this.http.put(`${environment.api}/coupons`, coupon);
  }

  deleteCoupon(id): any {
    return this.http.delete(`${environment.api}/coupons/${id}`);
  }

  createDiscount(discount: Discount): void {
    const discountData = {
      cut: discount.cut,
      expirationDate: discount.expirationDate,
      productId: discount.id,
    };
    this.http.post(`${environment.api}/discount`, discountData).subscribe();
  }

  getPromotions(): any {
    return this.http.get<Discount[]>(`${environment.api}/discount`);
  }

  checkForPromotion(product): any {
    return this.http.get<Discount>(
      `${environment.api}/discount/by-product/${product}`
    );
  }

  checkAuthForPromotion(product): any {
    // ! send user _id too!
    return this.http.get<Discount[]>(
      `${environment.api}/discount/by-product/auth/${product}`
    );
  }
}
