import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ProfileComponent } from './profile.component';

@NgModule({
    declarations: [ProfileComponent],
    imports: [ RouterModule.forChild([{ path: 'profilee', component: ProfileComponent }]),
    ],
  })
  export class ProfileModule {}
  