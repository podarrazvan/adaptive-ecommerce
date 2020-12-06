import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.modules';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartModule } from './cart/cart.module';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { FleshDealsComponent } from './home/flesh-deals/flesh-deals.component';
import { HomeBestSellersComponent } from './home/home-best-sellers/home-best-sellers.component';
import { HomeNewReleasesComponent } from './home/home-new-releases/home-new-releases.component';
import { HomeTopComponent } from './home/home-top/home-top.component';
import { HomeComponent } from './home/home.component';
import { HomeModules } from './home/home.modules';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const COMPONENTS = [
    HomeComponent,
    HomeTopComponent,
    SearchComponent,
    CheckoutComponent,
    AboutUsComponent,
    TermsOfUseComponent,
    ContactComponent,
    PageNotFoundComponent,
    CategoriesComponent,
    FleshDealsComponent,
    HomeBestSellersComponent,
    HomeNewReleasesComponent
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
    HomeModules
  ],
  providers: [],
  exports: [RouterModule]
})
export class PagesModule { }