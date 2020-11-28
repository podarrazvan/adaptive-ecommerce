import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.modules';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AreaComponent } from './home/area/area.component';
import { HomeCategoriesComponent } from './home/home-categories/home-categories.component';
import { HomeTopComponent } from './home/home-top/home-top.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesRoutes} from './pages-routing.module';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { TernsOfUseComponent } from './terns-of-use/terns-of-use.component';

const COMPONENTS = [
  HomeComponent,
    ProductComponent,
    SearchComponent,
    CheckoutComponent,
    CartComponent,
    AdminComponent,
    AboutUsComponent,
    TernsOfUseComponent,
    ContactComponent,
    PageNotFoundComponent,
    CategoriesComponent,
    HomeTopComponent,
    HomeCategoriesComponent,
    AreaComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    RouterModule.forChild(PagesRoutes),
    SharedModule,
    BrowserModule
  ],
  providers: [],
  exports: [...COMPONENTS, RouterModule]
})
export class PagesModule { }