import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from '../../shared/modules/shared.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    SharedModule,
    EditorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path:'',
        component: ContactComponent
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ContactModule {}
