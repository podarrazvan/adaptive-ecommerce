import { Component, OnInit } from '@angular/core';
import { DeleteAlertService } from 'src/app/shared/components/delete-alert/delete-alert.service';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { DbDeleteService } from 'src/app/shared/services/database/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { DbUploadService } from 'src/app/shared/services/database/db-upload.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService,
    private dbUploadService: DbUploadService,
    private dbDeleteService: DbDeleteService,
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
    this.dbFetchDataService.fetchMessages().subscribe((emails) => {
      for (let email of emails.messages) {
        this.emails.push(email);
      }
    });
  }

  openEmail(i) {
    const index = i;
    this.messageToShow = this.emails[index];
    this.showMessage = true;
    if (!this.emails[index].seen) {
      this.dbUploadService.updateMessage(this.emails[index]);
      this.emails[index].seen = true;
      this.sharedDataService.unreadMessages--;
    }
  }

  onDelete(i) {
    this.deleteAlert = true;
    const index = i;
    this.deleteAlertService.deleteMessage.subscribe((data) => {
      switch (data) {
        case true:
          this.dbDeleteService
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
