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

 
  
  getUsers() {
    const usersArray = [];
    return this.http
      .get<User[]>(
        ''
      )
      .pipe(
        map((responseData) => {
          for (const user of responseData) {
            usersArray.push({ user });
          }
          return usersArray;
        })
      );
  }

  
}

