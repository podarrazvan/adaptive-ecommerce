import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-desktop-version-messages',
  templateUrl: './desktop-version-messages.component.html',
  styleUrls: ['./desktop-version-messages.component.scss']
})
export class DesktopVersionMessagesComponent {

  @Input() emails;
  @Output() open = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  openEmail(i) {
    this.open.emit(i);
  }

  onDelete(i) {
    this.delete.emit(i);
  }
}
