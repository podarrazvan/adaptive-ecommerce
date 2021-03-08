import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ConfigsService } from '../services/database/configs.sevice';

@Injectable()
export class WebConfigResolver implements Resolve<any> {
  constructor(private configsService: ConfigsService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return this.configsService.getconfigs().toPromise();
  }
}
