import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent {
  @Output() delete = new EventEmitter<boolean>(null);

  yes(): void {
    this.delete.emit(true);
  }

  no(): void {
    this.delete.emit(false);
  }
}
