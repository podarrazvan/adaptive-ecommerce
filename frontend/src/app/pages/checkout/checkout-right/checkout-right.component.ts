import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { OrdersService } from '../../admin/orders/orders.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-right',
  templateUrl: './checkout-right.component.html',
  styleUrls: ['./checkout-right.component.scss'],
})
export class CheckoutRightComponent {
  total = 0;
  subtotal = 0;
  products;
  shippingPrice;
  cutTotal = 0;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private ordersService: OrdersService,
    private router: Router,
    private discountService: DiscountService,
    public sharedDataService: SharedDataService
  ) {
    this.products = JSON.parse(localStorage.getItem('cart'));
    for (let product of this.products) {
      this.total += product.price;
    }
    this.subtotal = this.total;
    const coupon = JSON.parse(localStorage.getItem('coupon'));
    if (coupon != null) {
      this.checkCoupon(coupon.code);
    }
  }

  get checkoutForm() {
    return this.checkoutService.orderFormGroup.get('order');
  }
  get orderDetailsForm() {
    this.shippingPrice = this.checkoutService.orderFormGroup.get(
      'order.orderDetails'
    ).value.shipping;
    return this.checkoutService.orderFormGroup.get('order.orderDetails');
  }

  get productsFrom() {
    return this.checkoutService.orderFormGroup.get(
      'order.products'
    ) as FormArray;
  }

  placeOrder() {
    for (let prod of this.products) {
      const product = prod.id;
      const quantity = prod.quantity;
      const price = prod.price;
      this.productsFrom.push(this.createProduct(product, quantity, price));
    }
    this.orderDetailsForm.patchValue({ total: this.total });
    const date = new Date();
    this.orderDetailsForm.patchValue({ date });
    const payment = this.orderDetailsForm.value.payment;
    if (payment === 'online') {
      this.router.navigate(['/order-payment']);
      localStorage.setItem('order', JSON.stringify(this.checkoutForm.value));
    } else {
      this.ordersService
        .addOrder(this.checkoutForm.value)
        .subscribe((response) => {
          const orderNumber = response.body.order.orderNumber;
          localStorage.removeItem('cart');
          localStorage.removeItem('coupon');
          this.router.navigate(['../order-status', orderNumber]);
        });
    }
  }

  public createProduct(product, quantity, price): FormGroup {
    return this.fb.group({ product, quantity, price });
  }

  checkCoupon(code) {
    this.discountService.getCoupon(code).subscribe((coupon) => {
      this.cutTotal = coupon.discount;
      if (this.cutTotal > this.total) {
        this.cutTotal = this.total;
      }
      this.total -= this.cutTotal;
    });
  }
}
