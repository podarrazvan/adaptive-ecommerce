import { Component, OnInit } from '@angular/core';
import { DbWebsiteEditService } from './shared/services/database/db-website-edit.sevice';
import { SharedDataService } from './shared/services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  constructor(
    private dbWebsiteEdit: DbWebsiteEditService,
    private sharedData: SharedDataService
  ) {}

  ngOnInit() {
    this.dbWebsiteEdit.fetchWebsiteDetails().subscribe((data) => {
      try {
        this.sharedData.setWebsiteDetails(data.info[0]);
      } catch {
        const websiteData = {
          // _id: '',
          name: 'name',
          categories: [],
          brands:[],
          adress: 'adress',
          phone: 'phone',
          email: 'email',
          program: 'program',
          facebookImage: 'empty',
          facebookUrl: 'facebook url',
          twitterImage: 'empty',
          twitterUrl: 'twitter url',
          youtubeImage: 'empty',
          youtubeUrl: 'youtube url',
          instagramImage: 'empty',
          instagramUrl: 'instagram url',
       
        };
        this.sharedData.setWebsiteDetails(websiteData);
      }
    });
  }
}
