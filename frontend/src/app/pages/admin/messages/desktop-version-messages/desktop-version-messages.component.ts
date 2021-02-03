import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-desktop-version-messages',
  templateUrl: './desktop-version-messages.component.html',
  styleUrls: ['./desktop-version-messages.component.scss']
})
export class DesktopVersionMessagesComponent implements OnInit {

  @Input() emails;
  @Output() open = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  ngOnInit(): void {
  }
  
  openEmail(i) {
    this.open.emit(i);
  }

  onDelete(i) {
    this.delete.emit(i);
  }
}
