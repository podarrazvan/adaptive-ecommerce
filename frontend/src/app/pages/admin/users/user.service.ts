import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../../../shared/interfaces/user.interface';

@Injectable()
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
}
