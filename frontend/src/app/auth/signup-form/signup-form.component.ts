import { Component, Input,EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../entities';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  @Input() addAdmin: boolean;
  @Output() adminCreated = new EventEmitter(null);
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.value.password === form.value.checkPassword) {
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;

      authObs = this.authService.signup(form.value, this.addAdmin);

      authObs.subscribe(
        (response) => {
          this.isLoading = false;
          if(!this.addAdmin) {
            this.router.navigate(['../']);
          } else {
            this.adminCreated.emit(response);
          }
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );

      form.reset();
    } else {
      alert("passwords don't match");
    }
  }
}
