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
