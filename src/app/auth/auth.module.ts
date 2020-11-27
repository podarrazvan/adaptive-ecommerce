import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

// @Injectable({ providedIn: 'root' })
@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }])
  ],
})
export class AuthModule {}
