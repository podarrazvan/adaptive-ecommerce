import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Output() close = new EventEmitter<void>();

  constructor(private sharedDataService: SharedDataService){}

  mobile:boolean;

  ngOnInit(): void {
    this.mobile = this.sharedDataService.mobile;
  }

  onClose() {
    this.close.emit();
  }
}
