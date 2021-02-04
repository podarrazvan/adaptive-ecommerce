import { Component, DoCheck, OnInit } from '@angular/core';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-admin-top-bar',
  templateUrl: './admin-top-bar.component.html',
  styleUrls: ['./admin-top-bar.component.scss']
})
export class AdminTopBarComponent implements OnInit, DoCheck  {

  constructor(
    private dbGetDataService: DbGetDataService,
    private sharedDataService: SharedDataService
  ) {}

  unread: number;

  hide = false;

  ngOnInit(): void {
    this.dbGetDataService.getMessages().subscribe((response) => {
      this.sharedDataService.unreadMessages = 0;
      for (let email of response) {
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
