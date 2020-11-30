import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { SharedModule } from 'src/app/shared/modules/shared.modules';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { MessagesComponent } from './messages/messages.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WebsiteEditComponent } from './website-edit/website-edit.component';

@NgModule({ 
    declarations: [
      AdminComponent
  ],
    imports: [
      SharedModule,
      RouterModule.forChild([{
        path:'admin', component: AdminComponent, children:[
          {path:'add-product',component: AddProductComponent},
          {path:'orders',component: OrdersComponent},
          {path:'messages',component: MessagesComponent},
          {path:'statistics',component: StatisticsComponent},
          {path:'products',component: ProductsComponent},
          {path:'website-edit',component: WebsiteEditComponent}
        ]
      }
    ])
    ],
  })
  export class AdminModule {}