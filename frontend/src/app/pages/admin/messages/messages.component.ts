import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private sharedDataService: SharedDataService
  ) {}

  emails;
  showMessage: boolean;
  messageToShow: Message;
  deleteAlertMessage: boolean;
  deleteIndex: number;

  ngOnInit(): void {
    this.emails = [];
    this.messagesService.getMessages().subscribe((response) => {
      for (const email of response) {
        this.emails.push(email);
      }
    });
  }

  openEmail(i): void {
    if (!this.deleteAlertMessage) {
      // ! you can do it better, don't emit openEmail!
      const index = i;
      this.messageToShow = this.emails[index];
      this.showMessage = true;
      if (!this.emails[index].seen) {
        this.messagesService.updateMessage(this.emails[index]);
        this.emails[index].seen = true;
        this.sharedDataService.unreadMessages--;
      }
    }
  }

  onDelete(confirmed): void {
    if (confirmed) {
      this.messagesService
        .deleteMessage(this.emails[this.deleteIndex]._id)
        .subscribe();
      this.emails.splice(this.deleteIndex, 1);
      this.deleteAlertMessage = false;
    } else {
      this.deleteAlertMessage = false;
    }
  }

  deleteAlert(index): void {
    this.deleteIndex = index;
    this.deleteAlertMessage = true;
  }

  close(): void {
    this.showMessage = false;
  }
}
