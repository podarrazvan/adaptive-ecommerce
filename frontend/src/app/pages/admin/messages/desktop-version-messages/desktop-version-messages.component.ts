import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-desktop-version-messages',
  templateUrl: './desktop-version-messages.component.html',
  styleUrls: ['./desktop-version-messages.component.scss'],
})
export class DesktopVersionMessagesComponent {
  @Input() emails;
  @Output() emailOpen = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  openEmail(i): void {
    this.emailOpen.emit(i);
  }

  onDelete(i): void {
    this.delete.emit(i);
  }
}
