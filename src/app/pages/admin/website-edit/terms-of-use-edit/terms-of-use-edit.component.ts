import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-terms-of-use-edit',
  templateUrl: './terms-of-use-edit.component.html',
  styleUrls: ['./terms-of-use-edit.component.scss'],
})
export class TermsOfUseEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private dbWebsiteEditService: DbWebsiteEditService,
              private dbFetchDataService: DbFetchDataService) {}

  termsOfUse: string;
  id: string;

  ngOnInit(): void {
    this.dbWebsiteEditService.fetchPages('terms-of-use').subscribe((terms) => {
      console.log(terms);
      this.termsOfUse = terms.info[0].content;
      this.id = terms.info[0]._id;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave(termsOfUse) {
    this.dbWebsiteEditService.editPages(termsOfUse.value,'terms-of-use',this.id);
    this.close.emit();
  }
}
