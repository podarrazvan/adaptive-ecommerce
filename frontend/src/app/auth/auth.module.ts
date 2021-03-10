import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    AuthComponent
],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }])
  ],
})
export class AuthModule {}
