import { Component, Input, OnInit } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-home-main-categories',
  templateUrl: './home-main-categories.component.html',
  styleUrls: ['./home-main-categories.component.scss']
})
export class HomeMainCategoriesComponent implements OnInit {

  categories;

  constructor(private sharedDataService: SharedDataService,
              private dbWebsiteEditService: DbWebsiteEditService) {}

  ngOnInit(): void {
    //! THIS IS WRONG BUT IT'S WORKING  
    this.dbWebsiteEditService.fetchWebsiteDetails().subscribe(details => {
      this.categories = details.info[0].categories;
    })
    //! ------------------------------------------------------------------

    //! THIS IS OK BUT NOT WORKING!
    // this.sharedDataService.websiteDetails.subscribe((data) => {
    //   try {
    //     this.categories = data.categories;
    //   } catch {
    //    this.categories = ['No categories', 'Please add some categories!'];
    //   } 
    // });
  }

}
