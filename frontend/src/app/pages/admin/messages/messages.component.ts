import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { DeleteAlertService } from '../../../shared/components/delete-alert/delete-alert.service';
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
    private sharedDataService: SharedDataService,
    private deleteAlertService: DeleteAlertService
  ) {}

  mobile: boolean;

  emails;

  showMessage: boolean;

  messageToShow: Message;

  deleteAlert: boolean;

  ngOnInit(): void {
    this.mobile = this.sharedDataService.mobile;
    this.emails = [];
    this.messagesService.getMessages().subscribe((response) => {
      for (let email of response) {
        this.emails.push(email);
      }
    });
  }

  openEmail(i) {
    if (!this.deleteAlert) { //! you can do it better, don't emit openEmail!
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

  onDelete(i) {
    this.deleteAlert = true;
    const index = i;
    this.deleteAlertService.deleteMessage.subscribe((response) => {
      switch (response) {
        case true:
          this.messagesService
            .deleteMessage(this.emails[index]._id)
            .subscribe();
          this.emails.splice(index, 1);
          this.deleteAlert = false;
          break;
        case false:
          this.deleteAlert = false;
          break;
      }
    });
  }

  close() {
    this.showMessage = false;
  }
}
