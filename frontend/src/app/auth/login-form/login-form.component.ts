import { AuthResponseData } from '../entities';
import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  isLoading = false;
  error = false;
  auth;
  resetPasswordMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = true;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.resetPasswordMode) {
      // TODO password reset
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.login(email, password);

    authObs.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['../']);
        form.reset();
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
