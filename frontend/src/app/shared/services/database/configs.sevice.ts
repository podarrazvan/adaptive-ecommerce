import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../../interfaces/coupon.interface';

@Injectable()
export class ConfigsService {
  categories: string[];
  category;

  constructor(private http: HttpClient) {}

  createconfigs() {
    // !!! aveai configs aici
    this.http
      .post(`${environment.api}/website`, null)
      .subscribe(() => location.reload());
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
