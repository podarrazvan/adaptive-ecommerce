import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './pages/additional-pages/page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SearchComponent } from './pages/search/search.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OrderStatusPageComponent } from './pages/checkout/order-status-page/order-status-page.component';
import { ProductsByBrandComponent } from './pages/products-by-brand/products-by-brand.component';
import { SpecialForYouComponent } from './pages/special-for-you/special-for-you.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { InfoComponent } from './pages/info/info.component';
import { OrderPaymentComponent } from './pages/order-payment/order-payment.component';
import { BrandsComponent } from './pages/brands/brands.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages-module').then((m) => m.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'wishlist', component: WishlistComponent },
  { path: 'search/:category/:search', component: SearchComponent },
  { path: 'search-by-brand/:brand', component: ProductsByBrandComponent },
  { path: 'brands', component: BrandsComponent },
  {
    path: 'special-for-you',
    component: SpecialForYouComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  { path: 'category/:category', component: CategoriesComponent },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  { path: 'order-payment', component: OrderPaymentComponent },

  { path: 'track-order', component: TrackOrderComponent },
  { path: 'order-status/:number', component: OrderStatusPageComponent },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'info/:page', component: InfoComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}

// {
//   path: 'profile',
//   loadChildren: () =>
//     import('../../pages/profile/profile.module').then((m) => m.ProfileModule),
// },
