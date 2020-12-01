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

  fbEmails: Message[];

  showMessage: boolean;

  messageToShow: Message;

  deleteAlert: boolean;

  ngOnInit(): void {
    this.mobile = this.sharedDataService.mobile;
    this.fbEmails = [];
    this.dbFetchDataService.fetchMessages().subscribe((emails) => {
      for (let email of emails) {
        this.fbEmails.push(email);
      }
    });
  }

  openEmail(i) {
    const index = i.index;
    this.messageToShow = this.fbEmails[index];
    this.showMessage = true;
    if (!this.fbEmails[index].seen) {
      this.dbUploadService.updateMessage(this.fbEmails[index]);
      this.fbEmails[index].seen = true;
      this.sharedDataService.unreadMessages--;
    }
  }

  onDelete(i) {
    this.deleteAlert = true;
    const index = i.index;
    this.deleteAlertService.deleteMessage.subscribe((data) => {
      switch (data) {
        case true:
          this.dbDeleteService
            .deleteMessage(this.fbEmails[index].key)
            .subscribe();
          this.fbEmails.splice(index, 1);
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
