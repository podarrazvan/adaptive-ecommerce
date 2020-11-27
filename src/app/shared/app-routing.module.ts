import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
{
  path: 'auth',
  loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule)
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
