import { DeleteAlertComponent } from './../../shared/components/delete-alert/delete-alert.component';
import { SharedModule } from './../../shared/modules/shared.modules';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AddProductComponent } from './add-product/add-product.component';
import { DescriptionStylesComponent } from './add-product/description-styles/description-styles.component';
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
import { FooterEditComponent } from './website-edit/footer-edit/footer-edit.component';
import { WebsiteEditComponent } from './website-edit/website-edit.component';
import { CategoriesEditComponent } from './website-edit/categories-edit/categories-edit.component';
import { BrandsEditComponent } from './website-edit/brands-edit/brands-edit.component';
import { CouponsEditComponent } from './website-edit/coupons-edit/coupons-edit.component';
import { ShippingEditComponent } from './website-edit/shipping-edit/shipping-edit.component';
import { CommonModule } from '@angular/common';
import { DiscountModalComponent } from './products/discount-modal/discount-modal.component';
import { PageEditComponent } from './website-edit/page-edit/page-edit.component';

const COMPONENTS = [
  AddProductComponent,
  OrdersComponent,
  MessagesComponent,
  StatisticsComponent,
  ProductsComponent,
  WebsiteEditComponent,
  FooterEditComponent,
  UsersComponent,
  OrdersComponent,
  OrderComponent,
  SidebarComponent,
  AdminTopBarComponent,
  DeleteAlertComponent,
  MessageComponent,
  DesktopVersionMessagesComponent,
  DescriptionStylesComponent,
  CategoriesEditComponent,
  BrandsEditComponent,
  CouponsEditComponent,
  ShippingEditComponent,
  DiscountModalComponent,
  PageEditComponent
];

@NgModule({
  declarations: [...COMPONENTS, AdminComponent, CategoriesEditComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path:'admin',
        component: AdminComponent,
        // canActivate: [AuthGuard],
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
