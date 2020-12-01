import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-desktop-version-messages',
  templateUrl: './desktop-version-messages.component.html',
  styleUrls: ['./desktop-version-messages.component.scss']
})
export class DesktopVersionMessagesComponent implements OnInit {

  @Input() emails;
  @Output() open = new EventEmitter();
  @Output() delete = new EventEmitter();

  ngOnInit(): void {

  }
  openEmail(i) {
    this.open.emit({index: i});
  }

  onDelete(i) {
    this.delete.emit({index: i});
  }
}
