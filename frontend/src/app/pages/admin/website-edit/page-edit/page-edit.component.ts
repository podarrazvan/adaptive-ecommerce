import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent {
  @Output() close = new EventEmitter<void>();
  @Input() pageName: string;
  @Input() content: string;

  constructor(private configsService: ConfigsService ) {}

  onClose() {
    this.close.emit();
  }

  onSave(aboutUs) {
    this.configsService.editPages(aboutUs.value,this.pageName);
    this.close.emit();
  }

}
