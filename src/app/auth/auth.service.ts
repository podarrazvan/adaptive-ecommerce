import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface Id {
  uid: string;
}

export interface AuthResponseData {
  token: string;
  email: string;
  password: string;
  refreshToken: string;
  expiresIn: string;
  userId: string;
  history: string[];
  categories: string[];
  favorites: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;

  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) {}

  signup(username: string ,email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/api/users/signup',
        {
          username: username,
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.password,
            resData.userId,
            resData.token,
            +resData.expiresIn,
            resData.history,
            resData.categories,
            resData.favorites
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/api/users/login',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.password,
            resData.userId,
            resData.token,
            +resData.expiresIn,
            resData.history,
            resData.categories,
            resData.favorites
          );
        })
      );
  }

  loginAdmin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/api/users/login/admin',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.password,
            resData.userId,
            resData.token,
            +resData.expiresIn,
            resData.history,
            resData.categories,
            resData.favorites
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      password: string;
      id: string;
      history: string[];
      categories: string[];
      favorites: string[];
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.password,
      userData.id,
      userData.categories,
      userData.history,
      userData.favorites,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public handleAuthentication(
    email: string,
    password: string,
    userId: string,
    token: string,
    expiresIn: number,
    history: string[],
    categories: string[],
    favorites: string[],
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 100);
    const user = new User(email,password, userId,history, categories, favorites, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 100);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    console.log('deconectare')
    this.user.next(null);
    const userData: {
      email: string;
      password: string;
      id: string;
      history: string[];
      categories: string[];
      favorites: string[];
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.updateUser(
      userData.email,
      userData.password,
      userData.id,
      userData._token,
      userData.categories,
      userData.history,
      userData.favorites
    );
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  updateUser( 
    email: string,
    password: string,
    userId: string,
    token: string,
    history: string[],
    categories: string[],
    favorites: string[]
    ){

    const user = new User(email,password, userId,history, categories, favorites, token);
    this.http.put(`http://localhost:3000/api/users/update`,user).subscribe();
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
