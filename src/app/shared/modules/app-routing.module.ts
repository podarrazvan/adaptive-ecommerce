import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminModule } from 'src/app/pages/admin/admin.module';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { ProductModule } from 'src/app/pages/product/product.module';

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
  {
    path: 'product',
    loadChildren: () =>
      import('../../pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule, AdminModule, ProductModule],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
