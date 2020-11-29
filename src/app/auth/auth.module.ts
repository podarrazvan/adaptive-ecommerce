import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.modules';

// @Injectable({ providedIn: 'root' })
@NgModule({ 
  declarations: [
    AuthComponent
],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }])
  ],
})
export class AuthModule {}
