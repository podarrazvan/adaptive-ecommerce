import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.modules';
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
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: 'checkout', component: CheckoutComponent }])
    ],
  })
  export class CheckoutModule {}