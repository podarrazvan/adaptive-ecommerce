import { Component } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { buildOrderFormGroup } from './order.form-builder';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(private checkoutService: CheckoutService){
    this.checkoutService.orderFormGroup = buildOrderFormGroup();
  }

  get orderNotesForm(): any {
    return this.checkoutService.orderFormGroup.get('order');
  }
}
