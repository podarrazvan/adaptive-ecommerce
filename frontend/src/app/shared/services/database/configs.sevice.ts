import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { Coupon } from '../../interfaces/coupon.interface';

@Injectable()
export class ConfigsService {
  categories: string[];
  category;

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}

  createconfigs() {
    // !!! aveai configs aici
    //const configs = this.sharedDataService.getWebsiteConfigs();
    this.http
      .post(`${environment.api}/website`, null)
      .subscribe(() => location.reload());
  }

  updateWebsite(sectionName: string, value) {
    const data = { data: value };
    const id = this.sharedDataService.layout$.pipe(map(layout => layout._id));
    this.http
      .put(`${environment.api}/website/${id}/${sectionName}`, data)
      .subscribe();
  }



  getCoupons() {
    return this.http.get<Coupon[]>(`${environment.api}/coupons`);
  }

  async editPages(content: string, page: string) {
    // !!! nu stiu daca asta e cea mai buna solutie
    const id = await this.sharedDataService.layout$.pipe(map(layout => layout._id)).toPromise();
    const pageContent = { content };
    this.http
      .put(`${environment.api}/pages/${page}/${id}`, pageContent)
      .subscribe();
  }

  getPages(page) {
    return this.http.get<{ info: [{ content: string; _id: string }] }>(
      `${environment.api}/pages/${page}`
    );
  }


}
