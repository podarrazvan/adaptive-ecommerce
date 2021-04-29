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

  createconfigs(): void {
    this.http
      .post<Layout>(`${environment.api}/website`, null)
      .subscribe((response) => {
        this.sharedDataService.setLayout(response);
      });
  }

  updateWebsite(sectionName: string, value, id): any {
    const data = { data: value };
    return this.http.put(
      `${environment.api}/website/${id}/${sectionName}`,
      data
    );
  }

  getCoupons(): any {
    return this.http.get<Coupon[]>(`${environment.api}/coupons`);
  }

  async editPages(content: string, page: string, id): Promise<void> {
    const pageContent = { content };
    this.http
      .put(`${environment.api}/pages/${page}/${id}`, pageContent)
      .subscribe();
  }

  getPages(page): any {
    return this.http.get<{ info: [{ content: string; _id: string }] }>(
      `${environment.api}/pages/${page}`
    );
  }
}
