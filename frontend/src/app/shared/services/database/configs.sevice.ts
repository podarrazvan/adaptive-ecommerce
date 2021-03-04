import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configs } from '../../interfaces/website-details';
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
    const configs = this.sharedDataService.getWebsiteConfigs();
    this.http
      .post(`${environment.api}/website`, configs)
      .subscribe(() => location.reload());
  }

  updateWebsite(sectionName: string, value) {
    const data = { data: value };
    const id = this.sharedDataService.getWebsiteConfigs()._id;
    this.http
      .put(`${environment.api}/website/${id}/${sectionName}`, data)
      .subscribe();
  }

  getconfigs() {
    return this.http.get<Configs>(
      `${environment.api}/website`
    );
  }

  getCoupons() {
    return this.http.get<Coupon[]>(`${environment.api}/coupons`);      
  }

  editPages(content: string, page: string) {
    const id = this.sharedDataService.getWebsiteConfigs()._id;
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
