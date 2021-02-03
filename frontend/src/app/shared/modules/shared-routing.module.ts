import { CategoriesComponent } from './../../pages/categories/categories.component';
import { AuthService } from './../../auth/auth.service';
import { ProductModule } from './../../pages/product/product.module';
import { AdminModule } from './../../pages/admin/admin.module';
import { AuthModule } from './../../auth/auth.module';
import { PageNotFoundComponent } from './../../pages/additional-pages/page-not-found/page-not-found.component';
import { CheckoutComponent } from './../../pages/checkout/checkout.component';
import { SearchComponent } from './../../pages/search/search.component';
import { WishlistComponent } from './../../pages/wishlist/wishlist.component';
import { ProfileComponent } from './../../pages/profile/profile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../pages/pages-module').then((m) => m.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../../pages/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  // {
  //   path: 'profile',
  //   loadChildren: () =>
  //     import('../../pages/profile/profile.module').then((m) => m.ProfileModule),
  // },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'search/:category/:search', component: SearchComponent },
  {
    path: 'product',
    loadChildren: () =>
      import('../../pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../../pages/cart/cart.module').then((m) => m.CartModule),
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category/:category', component: CategoriesComponent },
  {
    path: 'contact',
    loadChildren: () =>
      import('../../pages/contact/contact.module').then((m) => m.ContactModule),
  },
  // {
  //   path: 'checkout',
  //   loadChildren: () =>
  //     import('../../pages/checkout/checkout.module').then((m) => m.CheckoutModule),
  // },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    AdminModule,
    ProductModule,
  ],
  exports: [RouterModule],
  providers: [AuthService],
})
export class SharedRoutingModule {}
