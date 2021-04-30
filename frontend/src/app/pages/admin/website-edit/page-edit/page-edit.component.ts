import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TinyMCEComponent } from 'src/app/shared/components/tinymce/tinymce.component';
import { Layout } from 'src/app/shared/interfaces/website-details';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss'],
})
export class PageEditComponent {
  @Output() closeEdit = new EventEmitter<void>();
  public tinyMCE: TinyMCEComponent;
  content;
  initialValue;
  layout: Layout;
  pages = [
    'Terms Of Use',
    'About Us',
    'Shipping Info',
    'Payment Info',
    'Returns Exchange',
    'faq',
    'Customer Service',
    'Buyer Protection',
    'Help',
  ];
  page = this.pages[0];
  id;
  pageChanged = true;

  constructor(
    private configsService: ConfigsService,
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.layout$.subscribe((layout) => {
      if (this.pageChanged) {
        this.layout = layout;
        const pageName = this.camelize(this.page);
        this.initialValue =
          layout[pageName] === undefined ? '' : layout[pageName];
        this.id = layout._id;
        this.pageChanged = false;
      }
    });
  }

  onClose(): void {
    this.closeEdit.emit();
  }

  onSave(): void {
    const pageName = this.page.replace(/\s/g, '-').toLocaleLowerCase();
    this.configsService.editPages(this.content, pageName, this.id);
    this.closeEdit.emit();
  }
  ckeditorContentChanged(content): void {
    const div = document.createElement('div');
    div.innerHTML = content;
    this.content = div.innerHTML;
    const pageName = this.camelize(this.page);
    this.layout[pageName] = this.content;
    this.sharedDataService.setLayout(this.layout);
  }

  onPageChange(page): void {
    this.pageChanged = true;
    this.page = page;
    this.sharedDataService.layout$.subscribe((layout) => {
      if (this.pageChanged) {
        const pageName = this.camelize(this.page);
        this.initialValue =
          layout[pageName] === undefined ? '' : layout[pageName];
      }
    });
  }
  camelize(str): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index): string {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
