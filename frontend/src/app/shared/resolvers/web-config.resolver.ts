import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ConfigsService } from '../services/database/configs.sevice';

@Injectable()
export class WebConfigResolver implements Resolve<any> {
  constructor(private configsService: ConfigsService) {}


  // !SORIN STEP - 1 : Am creat un resolver, asta se apeleaza inainte sa se initieze componenta
  async resolve(route: ActivatedRouteSnapshot) {
    return this.configsService.getWebsiteDetails().toPromise();
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
//   this.configsService.createWebsiteDetails(websiteData);
//   this.sharedData.setWebsiteDetails(websiteData);
// }
