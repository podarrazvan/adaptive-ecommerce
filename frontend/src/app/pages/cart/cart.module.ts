import { SharedModule } from './../../shared/modules/shared.modules';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartCouponComponent } from './cart-coupon/cart-coupon.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart.component';

@NgModule({
    declarations: [
      CartComponent,
      CartItemComponent,
      CartCouponComponent
  ],
    imports: [
      CommonModule,
      MatIconModule,
      SharedModule,
      RouterModule.forChild([{ path: 'cart', component: CartComponent }])
    ],
  })
  export class CartModule {}
