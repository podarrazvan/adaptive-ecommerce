import { AuthResponseData } from '../entities';
import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NodeMailerService } from 'src/app/shared/services/node-mailer.service';
import { UsersService } from 'src/app/pages/admin/users/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  isLoading = false;
  resetPasswordMode = false;
  showResetPasswordCode = false;
  showNewPassword = false;
  email;
  code;
  infoMessage: string;
  success: boolean;
  showInfo = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private nodeMailerService: NodeMailerService,
    private usersService: UsersService
  ) {}

  onSubmit(form: NgForm) {
    // if (!form.valid && !this.resetPasswordMode) {
    //   this.error = true;
    // }
    const password = form.value.password;
    if (this.showResetPasswordCode) {
      this.code = form.value.code;
      this.usersService
        .checkCode(this.email, this.code)
        .subscribe((response) => {
          if (response != null) {
            this.showResetPasswordCode = false;
            this.showNewPassword = true;
          }
        });
    }

    if (
      this.resetPasswordMode &&
      !this.showResetPasswordCode &&
      !this.showNewPassword
    ) {
      this.email = form.value.email;
      this.nodeMailerService.passwordReset(this.email).subscribe((response) => {
        this.showResetPasswordCode = true;
      });
    }

    if (this.showNewPassword) {
      const confirmPassword = form.value.confirmPassword;
      if (password === confirmPassword) {
        this.usersService
          .updatePassword(this.email, this.code, password)
          .subscribe((response) => {
            this.infoMessage = 'Password updated!';
            this.success = true;
            this.showInfo = true;
            setTimeout(() => {
              this.router.navigate(['../']);
            }, 5000);
          });
      } else {
        this.infoMessage = "Passwords don't match";
        this.success = false;
        this.showInfo = true;
      }
    }

    if (
      !this.resetPasswordMode &&
      !this.showResetPasswordCode &&
      !this.showNewPassword
    ) {
      this.email = form.value.email;
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;

      authObs = this.authService.login(this.email, password);

      authObs.subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['../']);
          form.reset();
        },
        (errorMessage) => {
          this.infoMessage = ' Wrong email or password!';
          this.showInfo = true;
          this.success = false;
          this.isLoading = false;
        }
      );
    }
  }
}
