import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.modules';
import { HomeFleshDealsCarouselComponent } from './flesh-deals/home-flesh-deals-carousel/home-flesh-deals-carousel.component';
import { HomeBestSellersBottomComponent } from './home-best-sellers/home-best-sellers-bottom/home-best-sellers-bottom.component';
import { HomeBestSellersMiddleComponent } from './home-best-sellers/home-best-sellers-middle/home-best-sellers-middle.component';
import { HomeBestSellersTopComponent } from './home-best-sellers/home-best-sellers-top/home-best-sellers-top.component';
import { HomeMainAdComponent } from './home-main/home-main-ad/home-main-ad.component';
import { HomeMainBottomProductsComponent } from './home-main/home-main-bottom-products/home-main-bottom-products.component';
import { HomeMainCategoriesComponent } from './home-main/home-main-categories/home-main-categories.component';
import { HomeMainProductComponent } from './home-main/home-main-product/home-main-product.component';
import { HomeMainTopComponent } from './home-main/home-main-top/home-main-top.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { HomeMostSearchedComponent } from './home-most-searched/home-most-searched.component';
import { HomeNewReleasesCarouselComponent } from './home-new-releases/home-new-releases-carousel/home-new-releases-carousel.component';
import { HomeTopActionsComponent } from './home-top-actions/home-top-actions.component';
import { ShopByBrandProductsComponent } from './shop-by-brand/shop-by-brand-products/shop-by-brand-products.component';
import { ShopByBrandLeftComponent } from './shop-by-brand/shop-by-brand-left/shop-by-brand-left.component';
import { ShopByBrandLogosComponent } from './shop-by-brand/shop-by-brand-logos/shop-by-brand-logos.component';
import { ShopByBrandTopComponent } from './shop-by-brand/shop-by-brand-top/shop-by-brand-top.component';
import { ShopByBrandComponent } from './shop-by-brand/shop-by-brand.component';
import { HomeYouMayLikeComponent } from './home-you-may-like/home-you-may-like.component';
import { HomeYouMayLikeTopComponent } from './home-you-may-like/home-you-may-like-top/home-you-may-like-top.component';
import { HomeYouMayLikeProductsComponent } from './home-you-may-like/home-you-may-like-products/home-you-may-like-products.component';

const COMPONENTS = [
  HomeMainCategoriesComponent,
  HomeMainAdComponent,
  HomeMainProductComponent,
  HomeMainTopComponent,
  HomeMainBottomProductsComponent,
  HomeBestSellersTopComponent,
  HomeBestSellersMiddleComponent,
  HomeBestSellersBottomComponent,
  HomeFleshDealsCarouselComponent,
  HomeTopActionsComponent,
  HomeMostSearchedComponent,
  HomeMainComponent,
  HomeNewReleasesCarouselComponent,
  ShopByBrandComponent,
  ShopByBrandTopComponent,
  ShopByBrandLogosComponent,
  ShopByBrandLeftComponent,
  ShopByBrandProductsComponent, 
  HomeYouMayLikeComponent,
  HomeYouMayLikeTopComponent,
  HomeYouMayLikeProductsComponent
]

@NgModule({
    declarations: [
      ...COMPONENTS
    ],
    imports: [
        SharedModule,
        CommonModule,
        MatIconModule,
        RouterModule
    ],
    providers: [],
    exports: [...COMPONENTS,]
  })

export class HomeModules { }