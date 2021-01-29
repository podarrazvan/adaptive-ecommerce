import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent {
  @Output() close = new EventEmitter<void>();
  @Input() pageName: string;
  @Input() content: string;

  constructor(private dbWebsiteEditService: DbWebsiteEditService ) {}
 
  onClose() {
    this.close.emit();
  }

  onSave(aboutUs) {
    this.dbWebsiteEditService.editPages(aboutUs.value,this.pageName);
    this.close.emit();
  }

}
