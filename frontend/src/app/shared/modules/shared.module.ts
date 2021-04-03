import { ProductsService } from './../../pages/admin/products/products.service';
import { DiscountService } from '../services/database/discount.service';
import { WishlistItemComponent } from '../../pages/wishlist/wishlist-item/wishlist-item.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FooterComponent } from '../../components/footer/footer.component';
import { GetProductComponent } from '../components/get-product/get-product.component';
import { GetRecommendedProductComponent } from '../components/get-recommended-product/get-recommended-product.component';
import { HorizontalProductComponent } from '../components/horizontal-product/horizontal-product.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RatingComponent } from '../components/rating/rating.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TinyMCEComponent } from '../components/tinymce/tinymce.component';
import { TopActionsComponent } from '../../components/website-top/top-actions/top-actions.component';
import { TopBarComponent } from '../../components/website-top/top-bar.component/top-bar.component';
import { TopMostSearchedComponent } from '../../components/website-top/top-most-searched/top-most-searched.component';
import { WebsiteTopComponent } from '../../components/website-top/website-top.component';
import { LoginFormComponent } from '../../auth/login-form/login-form.component';
import { SignupFormComponent } from '../../auth/signup-form/signup-form.component';
import { ShortenPipe } from '../pipes/shorten.pipe';

import { StatisticsService } from '../services/database/statistics.service';
import { ConfigsService } from '../services/database/configs.sevice';
import { SharedDataService } from '../services/shared-data.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BottomProductsComponent } from '../components/bottom-products/bottom-products.component';
import { SimpleHorizontalProductComponent } from '../components/simple-horizontal-product/simple-horizontal-product.component';
import { FooterAddressComponent } from '../../components/footer/footer-address/footer-address.component';
import { FooterQuickMenuComponent } from '../../components/footer/footer-quick-menu/footer-quick-menu.component';
import { CustomerServiceComponent } from '../../components/footer/customer-service/customer-service.component';
import { FooterFollowUsComponent } from '../../components/footer/footer-follow-us/footer-follow-us.component';
import { NewPricePipe } from '../pipes/new-price.pipe';
import { PercentagePipe } from '../pipes/percentage.pipe';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from '../components/countdown/countdown.component';
import { InfoAlertComponent } from '../components/info-alert/info-alert.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { LoadingComponent } from '../loading/loading.component';

const COMPONENTS = [
  NavbarComponent,
  WebsiteTopComponent,
  TopMostSearchedComponent,
  TopActionsComponent,
  TopBarComponent,
  FooterComponent,
  GetProductComponent,
  ShortenPipe,
  SignupFormComponent,
  LoginFormComponent,
  RatingComponent,
  GetRecommendedProductComponent,
  SearchBarComponent,
  HorizontalProductComponent,
  TinyMCEComponent,
  BottomProductsComponent,
  SimpleHorizontalProductComponent,
  FooterAddressComponent,
  FooterQuickMenuComponent,
  CustomerServiceComponent,
  FooterFollowUsComponent,
  WishlistItemComponent,
  PercentagePipe,
  NewPricePipe,
  CountdownComponent,
  InfoAlertComponent,
  PaginationComponent,
  LoadingComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  EditorModule,
  MatMenuModule,
  MatIconModule,
  CountdownModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [
    ConfigsService,
    SharedDataService,
    StatisticsService,
    DiscountService,
    ProductsService
  ],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
