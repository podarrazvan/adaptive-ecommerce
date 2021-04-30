import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor() {
    const email = JSON.parse(localStorage.getItem('emailNewAccount'));
    if (email != null) {
      this.isLoginMode = false;
    }
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
}
