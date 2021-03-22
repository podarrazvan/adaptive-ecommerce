import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent {
  @Output() delete = new EventEmitter<boolean>(null);
    
  yes() {
      this.delete.emit(true);
  }

  no() {
      this.delete.emit(false);
  }
}
