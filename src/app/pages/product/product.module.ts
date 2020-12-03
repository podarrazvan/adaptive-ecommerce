import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.modules';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: 'product/:category/:key', component: ProductComponent }]),
  ],
  exports: [RouterModule],
})
export class ProductModule {}
