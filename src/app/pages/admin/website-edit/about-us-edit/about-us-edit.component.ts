import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-about-us-edit',
  templateUrl: './about-us-edit.component.html',
  styleUrls: ['./about-us-edit.component.scss']
})
export class AboutUsEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private dbFetchDataService: DbFetchDataService,
              private dbWebsiteEditService: DbWebsiteEditService ) {}

  aboutUs: string;
  id: string;

  ngOnInit(): void {
    this.dbWebsiteEditService.fetchPages('about-us').subscribe((about) => {
      this.aboutUs = about.info[0].content;
      this.id = about.info[0]._id;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave(aboutUs) {
    this.dbWebsiteEditService.editPages(aboutUs.value,'about-us',this.id);
    this.close.emit();
  }
}
