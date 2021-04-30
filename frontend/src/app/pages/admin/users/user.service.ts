import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../../shared/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  categories: string[];
  category;

  getAdmins(): any {
    return this.http.get<User[]>(`${environment.api}/users/admins`);
  }

  getUsers(page: number, limit: number): any {
    return this.http.get<{
      next: { page: number; limit: number };
      results: User[];
    }>(`${environment.api}/users?page=${page}&limit=${limit}`);
  }

  deleteAdmin(username: string): any {
    return this.http.delete(
      `${environment.api}/users/admins/delete/${username}`
    );
  }

  deleteUser(username: string): any {
    return this.http.delete(`${environment.api}/users/delete/${username}`);
  }

  updatePassword(email, recoveryPasswordCode, password): any {
    const user = { email, recoveryPasswordCode, password };
    return this.http.put(`${environment.api}/users/update-password`, user);
  }

  checkCode(email, code): any {
    return this.http.get(
      `${environment.api}/users/check-code/${email}/${code}`
    );
  }

  updateHistory(email, history): any {
    const user = { email, history };
    return this.http.put(`${environment.api}/users/history`, user);
  }

  updateFavorites(email, favorites): any {
    const user = { email, favorites };
    return this.http.put(`${environment.api}/users/favorites`, user);
  }

  updateAdmin(id, isAdmin): any {
    const user = { _id: id, isAdmin };
    return this.http.put(`${environment.api}/users/update/admin`, user);
  }
}
