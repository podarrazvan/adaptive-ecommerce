import { Component, DoCheck, OnInit } from '@angular/core';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, DoCheck {
  unread: number;
  hide = false;

  constructor(
    private messagesService: MessagesService,
    private sharedDataService: SharedDataService
  ) {}

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
