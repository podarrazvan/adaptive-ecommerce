import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../../interfaces/coupon.interface';
import { SharedDataService } from '../shared-data.service';
import { Layout } from '../../interfaces/website-details';

@Injectable()
export class ConfigsService {
  categories: string[];
  category;

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}

  createconfigs() {
    this.http.post<Layout>(`${environment.api}/website`, null).subscribe((response) => {
      this.sharedDataService.setLayout(response);
    });
  }

  updateWebsite(sectionName: string, value, id) {
    const data = { data: value };
    return this.http.put(
      `${environment.api}/website/${id}/${sectionName}`,
      data
    );
  }

  getCoupons() {
    return this.http.get<Coupon[]>(`${environment.api}/coupons`);
  }

  async editPages(content: string, page: string, id) {
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
