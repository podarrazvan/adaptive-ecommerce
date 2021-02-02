import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { environment } from 'src/environments/environment';
import {
  AuthResponseData,
  AuthUserInfoDto,
  AutoLogout,
  Logout,
  NewUserDto
} from './entities';
@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(newUser: NewUserDto) {
    return this.http
      .post<AuthResponseData>(`${environment.api}/users/signup`, {
        ...newUser,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.api}/users/login`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    const userData: AutoLogout = JSON.parse(localStorage.getItem('userData'));
    const {
      email,
      password,
      id,
      history,
      categories,
      favorites,
      _token,
      _tokenExpirationDate,
    } = userData;
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      email,
      password,
      id,
      categories,
      history,
      favorites,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public handleAuthentication(authUserInfo: AuthUserInfoDto) {
    const {
      email,
      password,
      id,
      history,
      categories,
      favorites,
      token,
      expiresIn,
    } = authUserInfo;
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 100);
    const user = new User(
      email,
      password,
      id,
      history,
      categories,
      favorites,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(+expiresIn * 100);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    const userData: Logout = JSON.parse(localStorage.getItem('userData'));
    this.updateUser(userData);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  updateUser(updateUser: AuthUserInfoDto) {
    const {
      email,
      password,
      id,
      history,
      categories,
      favorites,
      token,
    } = updateUser;
    const user = new User(
      email,
      password,
      id,
      history,
      categories,
      favorites,
      token
    );
    this.http.put(`${environment.api}/users/update`, user).subscribe();
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
