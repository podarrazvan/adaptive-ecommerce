import { DbWebsiteEditService } from '../services/database/db-website-edit.sevice';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class WebConfigResolver implements Resolve<any> {
  constructor(private dbWebsiteEdit: DbWebsiteEditService) {}


  // !SORIN STEP - 1 : Am creat un resolver, asta se apeleaza inainte sa se initieze componenta
  async resolve(route: ActivatedRouteSnapshot) {
    return this.dbWebsiteEdit.getWebsiteDetails().toPromise();
  }
}

// TODO: SORIN move this , init the behaviour subject with this values in sharedDataService
// catch {
//   const websiteData = {
//     // _id: '',
//     name: 'name',
//     categories: [],
//     brands:[],
//     shipping:[],
//     footer: {
//       adress: 'adress',
//       phone: 'phone',
//       email: 'email',
//       program: 'program',
//     },
//     facebookImage: 'empty',
//     facebookUrl: 'facebook url',
//     twitterImage: 'empty',
//     twitterUrl: 'twitter url',
//     youtubeImage: 'empty',
//     youtubeUrl: 'youtube url',
//     instagramImage: 'empty',
//     instagramUrl: 'instagram url',
//     termsOfUse: '',
//     aboutUs:'',

//   };
//   this.dbWebsiteEdit.createWebsiteDetails(websiteData);
//   this.sharedData.setWebsiteDetails(websiteData);
// }
