import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../admin/messages/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService
  ) {
    this.buildFormGroup();
  }

  onSubmit(): void {
    this.messagesService.addMessage(this.contactForm.value).subscribe(() => {
      this.contactForm.reset();
      alert('Message sent!');
    });
  }

  private buildFormGroup(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
}
