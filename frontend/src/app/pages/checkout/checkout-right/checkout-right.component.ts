import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from '../../admin/orders/orders.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-right',
  templateUrl: './checkout-right.component.html',
  styleUrls: ['./checkout-right.component.scss'],
})
export class CheckoutRightComponent {
  total = 0;
  products;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private ordersService: OrdersService
  ) {
    this.products = JSON.parse(localStorage.getItem('cart'));
    console.log(this.products);
    for(let product of this.products) {
      this.total += +product.quantity* product.price;
    }
    console.log(this.total);
  }

  get checkoutForm() {
    return this.checkoutService.orderFormGroup.get('order');
  }
  get orderDetailsForm() {
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
      this.productsFrom.push(this.createProduct(product, quantity));
    }
    this.orderDetailsForm.patchValue({total: this.total});
    const date = new Date();
    this.orderDetailsForm.patchValue({ date });
    this.ordersService.addOrder(this.checkoutForm.value);
  }

  public createProduct(product, quantity): FormGroup {
    return this.fb.group({ product, quantity });
  }
}
