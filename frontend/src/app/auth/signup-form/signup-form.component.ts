import { Component, Input, EventEmitter, Output } from '@angular/core';
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
  infoMessage: string;
  success: boolean;
  showInfo: boolean;
  email;

  constructor(private authService: AuthService, private router: Router) {
    const email = JSON.parse(localStorage.getItem('emailNewAccount'));
    if (email != null) {
      this.email = email;
      localStorage.removeItem('emailNewAccount');
    }
  }

  onSubmit(form: NgForm): void {
    if (form.value.password === form.value.checkPassword) {
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;

      authObs = this.authService.signup(form.value, this.addAdmin);

      authObs.subscribe(
        (response) => {
          this.isLoading = false;
          if (response.message) {
            this.infoMessage = response.message;
            this.success = false;
            this.showInfo = true;
          } else {
            if (!this.addAdmin) {
              this.router.navigate(['../']);
            } else {
              this.adminCreated.emit(response);
            }
            form.reset();
          }
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      this.infoMessage = 'Passwords don\'t match';
      this.success = false;
      this.showInfo = true;
    }
  }
}
