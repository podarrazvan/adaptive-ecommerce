import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class NodeMailerService {
  constructor(private http: HttpClient) {}

  passwordReset(email): any {
    const user = { email };
    return this.http.put(
      `${environment.api}/email-sender/password-recovery`,
      user
    );
  }
}
