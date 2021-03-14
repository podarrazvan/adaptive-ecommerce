import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../../shared/interfaces/user.interface';

@Injectable({providedIn:'root'})
export class UsersService {
  constructor(private http: HttpClient) {}

  categories: string[];
  category;

  getAdmins() {
    return this.http.get<User[]>(`${environment.api}/users/admins`);
  }

  getUsers() {
    return this.http.get<User[]>('');
  }

  deleteAdmin(username: string) {
    return this.http.delete(`${environment.api}/users/admins/delete/${username}`);
  }

  updatePassword(email, recoveryPasswordCode, password) {
    const user = {email, recoveryPasswordCode, password};
    return this.http.put(`${environment.api}/users/update-password`, user);
  }

  checkCode(email, code) {
    return this.http.get(`${environment.api}/users/check-code/${email}/${code}`);
  }

  updateHistory(email, history) {
    const user = {email, history}
    return this.http.put(`${environment.api}/users/history`, user);
  }

  updateFavorites(email, favorites) {
    const user = {email, favorites}
    return this.http.put(`${environment.api}/users/favorites`, user);
  }
}
