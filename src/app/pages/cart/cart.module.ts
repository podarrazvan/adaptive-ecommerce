import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.modules';
import { CartComponent } from './cart.component';

@NgModule({ 
    declarations: [
      CartComponent
  ],
    imports: [ 
      CommonModule,
      MatIconModule,
      SharedModule,
      RouterModule.forChild([{ path: 'cart', component: CartComponent }])
    ],
  })
  export class CartModule {}