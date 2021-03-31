import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  content;
  page;
  noContent = false;
  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    public sanitizer: DomSanitizer
  ) {
    this.route.url.subscribe(() => {
      this.page = this.route.snapshot.params['page'].replace('-', ' ');
      const name = this.camelize(this.page);
      this.getContent(name);
    });
  }

  getContent(name) {
    this.sharedDataService.layout$.subscribe((layout) => {
      this.content = layout[name];
      if (this.content === undefined || '') {
        this.content = '';
        this.noContent = true;
      }
    });
  }

  camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
