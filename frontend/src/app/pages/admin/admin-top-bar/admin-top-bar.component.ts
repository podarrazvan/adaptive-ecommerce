import { Component, DoCheck, OnInit } from '@angular/core';
import { DbFetchDataService } from '../../../shared/services/database/db-fetch-data.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-admin-top-bar',
  templateUrl: './admin-top-bar.component.html',
  styleUrls: ['./admin-top-bar.component.scss']
})
export class AdminTopBarComponent implements OnInit, DoCheck  {

  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService
  ) {}

  unread: number;

  hide = false;

  ngOnInit(): void {
    this.dbFetchDataService.fetchMessages().subscribe((emails) => {
      this.sharedDataService.unreadMessages = 0;
      for (let email of emails.messages) {
        if (!email.seen) {
          this.sharedDataService.unreadMessages++;
        }
      }
      this.unread = this.sharedDataService.unreadMessages;
    });
  }

  ngDoCheck() {
    this.unread = this.sharedDataService.unreadMessages;
  }

}
