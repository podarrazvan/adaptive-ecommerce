import { Routes } from '@angular/router';

export const PagesRoutes: Routes = [{
  path: 'cart',
  loadChildren: () =>
  import('./cart/cart.component').then((m) => m.CartComponent)
},
];

