import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeComponent } from 'src/app/pages/home/home.component';


const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../../pages/admin/admin.module').then((m) => m.AdminModule),
  },
{
  path: 'auth',
  loadChildren: () => import('../../auth/auth.module').then((m) => m.AuthModule)
},
{
  path: '**',
  redirectTo: '/page-not-found',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthModule
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
