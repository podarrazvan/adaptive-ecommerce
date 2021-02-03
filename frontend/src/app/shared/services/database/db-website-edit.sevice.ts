import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsiteDetails } from '../../interfaces/website-details';
import { SharedDataService } from '../shared-data.service';
import { Coupon } from '../../interfaces/coupon.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class DbWebsiteEditService {
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}
  categories: string[];
  category;

  createWebsiteDetails(details: WebsiteDetails) {
    this.http
      .post(`${environment.api}/website`, details)
      .subscribe(() => location.reload());
  }

  updateWebsite(sectionName: string, value) {
    const data = { data: value };
    const id = this.sharedDataService.websiteDocId;
    this.http
      .put(`${environment.api}/website/${id}/${sectionName}`, data)
      .subscribe();
  }

  getWebsiteDetails() {
    return this.http.get<WebsiteDetails>(
      `${environment.api}/website`
    );
  }

  getCoupons() {
    let couponsArray = [];
    return this.http
      .get<{ coupon: Coupon[] }>(`${environment.api}/coupons`)
      .pipe(
        map((responseData) => {
          for (const coupon of responseData.coupon) {
            couponsArray.push({ coupon });
          }
          return couponsArray;
        })
      );
  }

  editPages(content: string, page: string) {
    const id = this.sharedDataService.websiteDocId;
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

  addCoupon(coupon: Coupon) {
    const couponToAdd: Coupon = {
      code: coupon.code,
      discount: coupon.discount,
    };
    this.http.post(`${environment.api}/coupons`, couponToAdd).subscribe();
  }
}
