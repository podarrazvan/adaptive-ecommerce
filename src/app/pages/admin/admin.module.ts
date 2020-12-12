import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DeleteAlertComponent } from 'src/app/shared/components/delete-alert/delete-alert.component';
import { SharedModule } from 'src/app/shared/modules/shared.modules';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminTopBarComponent } from './admin-top-bar/admin-top-bar.component';
import { AdminComponent } from './admin.component';
import { DesktopVersionMessagesComponent } from './messages/desktop-version-messages/desktop-version-messages.component';
import { MessageComponent } from './messages/message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { AboutUsEditComponent } from './website-edit/about-us-edit/about-us-edit.component';
import { FooterEditComponent } from './website-edit/footer-edit/footer-edit.component';
import { TermsOfUseEditComponent } from './website-edit/terms-of-use-edit/terms-of-use-edit.component';
import { WebsiteEditComponent } from './website-edit/website-edit.component';

const COMPONENTS = [
  AddProductComponent,
  OrdersComponent,
  MessagesComponent,
  StatisticsComponent,
  ProductsComponent,
  WebsiteEditComponent,
  AboutUsEditComponent,
  FooterEditComponent,
  TermsOfUseEditComponent,
  UsersComponent,
  OrdersComponent,
  OrderComponent,
  SidebarComponent,
  AdminTopBarComponent, 
  DeleteAlertComponent,
  MessageComponent,
  DesktopVersionMessagesComponent
];

@NgModule({
  declarations: [...COMPONENTS, AdminComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'admin',
        component: AdminComponent,
        children: [
          { path: 'add-product', component: AddProductComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'messages', component: MessagesComponent },
          { path: 'statistics', component: StatisticsComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'website-edit', component: WebsiteEditComponent },
          { path: 'users', component: UsersComponent },
        ]
      },
    ]),
  ],
  exports: [...COMPONENTS, RouterModule],
})
export class AdminModule {}
