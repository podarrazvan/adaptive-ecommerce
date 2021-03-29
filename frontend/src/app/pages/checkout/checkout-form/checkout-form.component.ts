import { Component, Output,EventEmitter } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent {
  @Output() create  = new EventEmitter<boolean>(null);
  createBoolean = false;

  constructor(private checkoutService: CheckoutService) {}

  get checkoutForm () {
    return this.checkoutService.orderFormGroup.get('order.billingDetails');
  }

  createAccount() {
    this.createBoolean = !this.createBoolean;
    this.create.emit(this.createBoolean);
  }
}
