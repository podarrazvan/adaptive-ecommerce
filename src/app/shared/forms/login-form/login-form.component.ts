import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/auth/auth.service';
import firebase from 'firebase';
import {environment} from "../../../../environments/environment.prod"
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
  admin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    firebase.initializeApp(environment.firebase);
  }

  resetPassword(emailAddress) {
    this.auth = firebase.auth();

    firebase.auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        this.resetPasswordMode = false;
        alert("Check your email!");
        this.router.navigate(['../']);
      })
      .catch(function (error) {
       this.error = true;
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = true;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.resetPasswordMode){
      this.resetPassword(password);
    }
   
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.admin) {
      authObs = this.authService.loginAdmin(email, password);
    } else {
      authObs = this.authService.login(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['../']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
