import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { OrdersService } from '../../admin/orders/orders.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent {
  constructor(
    private sharedDataService: SharedDataService,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.buildFormGroup();
  }

  checkoutForm: FormGroup;

  onSubmit() {
    const order = {
      adress: this.checkoutForm.value,
      cart: JSON.parse(localStorage.getItem('cart')),
      total: this.sharedDataService.totalCart.toString(),
    };
    this.ordersService.addOrder(order);
    localStorage.removeItem('cart');
    this.checkoutForm.reset();
    this.sharedDataService.updateCart(true);
    alert('Order sent!');
    this.router.navigate(['../../']);
  }

  private buildFormGroup() {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }
}