import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponseData } from 'src/app/auth/entities';
// export const Firebase = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  isLoading = false;
  error = false;
  auth;
  resetPasswordMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = true;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.resetPasswordMode){
      // TODO password reset
    }
   
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.login(email, password);
    
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['../']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
