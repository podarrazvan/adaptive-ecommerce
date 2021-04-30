import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  error: any;

  constructor(private http: HttpClient) {}

  addMessage(message: Message): any {
    const date = new Date();
    const messageToAdd = {
      name: message.name,
      subject: message.subject,
      email: message.email,
      message: message.message,
      date,
      seen: false,
    };
    return this.http.post(`${environment.api}/contact`, messageToAdd, {
      observe: 'response',
    });
  }

  updateMessage(message: Message): void {
    const messageToAdd = {
      name: message.name,
      subject: message.subject,
      email: message.email,
      message: message.message,
      date: message.date,
      seen: true,
    };
    this.http
      .put(`${environment.api}/contact/${message._id}`, messageToAdd, {
        observe: 'response',
      })
      .subscribe();
  }

  getMessages(): any {
    return this.http.get<Message[]>(`${environment.api}/contact`);
  }

  deleteMessage(id: string): any {
    return this.http.delete(`${environment.api}/contact/${id}`);
  }
}
