import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbUploadService } from '../../shared/services/database/db-upload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbUploadService: DbUploadService
  ) {
    this.buildFormGroup();
  }

  onSubmit() {
    this.dbUploadService.addMessage(this.contactForm.value).subscribe(()=> {
      this.contactForm.reset();
      alert('Message sent!');
    });
  }

  private buildFormGroup() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
}
