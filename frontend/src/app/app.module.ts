import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedRoutingModule } from './shared/modules/shared-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.modules';
import { PagesModule } from './pages/pages-module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './pages/admin/admin.module';
import { CheckoutModule } from './pages/checkout/checkout.module';
import { ProfileModule } from './pages/profile/profile.module';
import { Interceptor } from './shared/interceptor';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { ProductsService } from './pages/admin/products/products.service';
import { MessagesService } from './pages/admin/messages/messages.service';
import { StatisticsService } from './shared/services/database/statistics.service';
import { ConfigsService } from './shared/services/database/configs.sevice';
import { UsersService } from './pages/admin/users/user.service';
import { OrdersService } from './pages/admin/orders/orders.service';
import { ImagesService } from './shared/services/database/images.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedRoutingModule,
    HttpClientModule,
    PagesModule,
    SharedModule,
    AuthModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutModule,
    ProfileModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    DiscountService,
    ProductsService,
    MessagesService,
    MessagesService,
    DiscountService,
    StatisticsService,
    ConfigsService,
    UsersService,
    OrdersService,
    ImagesService
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
