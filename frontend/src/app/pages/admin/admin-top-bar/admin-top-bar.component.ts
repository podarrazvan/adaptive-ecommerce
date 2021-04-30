import { Component, DoCheck, OnInit } from '@angular/core';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-admin-top-bar',
  templateUrl: './admin-top-bar.component.html',
  styleUrls: ['./admin-top-bar.component.scss'],
})
export class AdminTopBarComponent implements OnInit, DoCheck {
  constructor(
    private messagesService: MessagesService,
    private sharedDataService: SharedDataService
  ) {}

  unread: number;

  hide = false;

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe((response) => {
      this.sharedDataService.unreadMessages = 0;
      for (const email of response) {
        if (!email.seen) {
          this.sharedDataService.unreadMessages++;
        }
      }
      this.unread = this.sharedDataService.unreadMessages;
    });
  }

  ngDoCheck(): void {
    this.unread = this.sharedDataService.unreadMessages;
  }
}
