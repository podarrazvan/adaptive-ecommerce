import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from '../../shared/modules/shared.modules';
import { ContactComponent } from './contact.component';

const COMPONENTS  = [

]

@NgModule({
  declarations: [...COMPONENTS, ContactComponent],
  imports: [
    MatIconModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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
  exports: [...COMPONENTS, RouterModule],
})
export class ContactModule {}
