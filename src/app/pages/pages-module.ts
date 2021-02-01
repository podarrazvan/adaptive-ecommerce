import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.modules';
import { AboutUsComponent } from './additional-pages/about-us/about-us.component';
import { PageNotFoundComponent } from './additional-pages/page-not-found/page-not-found.component';
import { TermsOfUseComponent } from './additional-pages/terms-of-use/terms-of-use.component';
import { CartModule } from './cart/cart.module';
import { CategoriesComponent } from './categories/categories.component';
import { FleshDealsComponent } from './home/flesh-deals/flesh-deals.component';
import { HomeBestSellersComponent } from './home/home-best-sellers/home-best-sellers.component';
import { HomeNewReleasesComponent } from './home/home-new-releases/home-new-releases.component';
import { HomeComponent } from './home/home.component';
import { HomeModules } from './home/home.modules';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const COMPONENTS = [
    HomeComponent,
    SearchComponent,
    AboutUsComponent,
    TermsOfUseComponent,
    PageNotFoundComponent,
    CategoriesComponent,
    FleshDealsComponent,
    HomeBestSellersComponent,
    HomeNewReleasesComponent,
    WishlistComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    RouterModule.forChild([{
      path:'',
      component:HomeComponent,
    }]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CartModule,
    HomeModules,
  ],
  providers: [],
  exports: [RouterModule]
})
export class PagesModule { }