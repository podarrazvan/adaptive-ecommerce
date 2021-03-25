import { Message } from './../../../../shared/interfaces/message.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message: Message;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
