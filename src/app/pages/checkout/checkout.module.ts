import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { CheckoutRightComponent } from './checkout-right/checkout-right.component';
import { CheckoutComponent } from './checkout.component';
@NgModule({ 
    declarations: [
      CheckoutComponent,
      CheckoutFormComponent,
      CheckoutRightComponent
  ],
    imports: [ 
      CommonModule,
      MatIconModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild([{ path: 'checkout', component: CheckoutComponent }])
    ],
  })
  export class CheckoutModule {}