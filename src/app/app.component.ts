import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
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
    private sharedData: SharedDataService,
    private authService: AuthService,
  ) {  this.dbWebsiteEdit.fetchWebsiteDetails().subscribe((data) => {
    try {
      this.sharedData.setWebsiteDetails(data.info[0]);
    } catch {
      const websiteData = {
        // _id: '',
        name: 'name',
        categories: [],
        brands:[],
        shipping:[],
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
      this.dbWebsiteEdit.createWebsiteDetails(websiteData);
      this.sharedData.setWebsiteDetails(websiteData);
    }
  });}

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('userData')) != null){
      this.sharedData.setUserDetails(JSON.parse(localStorage.getItem('userData')));
    } else {
      const date = new Date();
      const user = {
        favorite: [],
        history: [],
        categories: [],
        lastVisit: date
      }
      this.sharedData.setUserDetails(user);
    }
    this.authService.autoLogin();
  }
}
