import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsiteDetails } from '../../interfaces/website-details';
import { SharedDataService } from '../shared-data.service';
import { Coupon } from '../../interfaces/coupon.interface';
import { environment } from 'src/environments/environment';
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
    const websiteDetails = { info: details };
    const id = this.sharedDataService.websiteDocId;
    console.log(websiteDetails);

    this.http
      .post(`${environment.api}/website`, websiteDetails)
      .subscribe(() => location.reload());
  }

  updateWebsite(sectionName: string, value) {
    const data = {info: value};
    const id = this.sharedDataService.websiteDocId;
    this.http.put(`${environment.api}/website/${id}/${sectionName}`,data).subscribe((error) => console.log(error));
  }

  updateWebsiteName(name: string) {
    const id = this.sharedDataService.websiteDocId;
    const newName = { info: name };
    this.http
      .put(`${environment.api}/website/${id}/websiteName`, newName)
      .subscribe((error) => console.log(error));
  }
  
  updateWebsiteCategories(categories: string[]) {
    const id = this.sharedDataService.websiteDocId;
    const newCategories = { info: categories };
    this.http
      .put(`${environment.api}/website/${id}/websiteCategories`, newCategories)
      .subscribe((error) => console.log(error));
  }


  fetchWebsiteDetails() {
    return this.http.get<{ info: WebsiteDetails }>(
      `${environment.api}/website`
    );
  }

  fetchCoupons() {
    let couponsArray = []
    return this.http.get<{coupon: Coupon[]}>(`${environment.api}/coupons`).pipe(
      map((responseData) => {
        for (const coupon of responseData.coupon) {
          couponsArray.push({coupon});
        }
        console.log(couponsArray);
        return couponsArray;
      })
    );;
  }

  editPages(content: string, page: string, id?: string) {
    const pageData = { content: content };
    console.log(id);
    if (!id) {
      this.http
        .post(`${environment.api}/pages/${page}`, pageData)
        .subscribe(
          (responseData) => {
            console.log(responseData);
          },
          (error) => {
            console.log(error.message);
          }
        );
    } else {
      this.http
        .put(`${environment.api}/pages/${page}/${id}`, pageData)
        .subscribe(
          (responseData) => {
            console.log(responseData);
          },
          (error) => {
            console.log(error.message);
          }
        );
    }
  }

  fetchPages(page) {
    return this.http.get<{ info: [{ content: string; _id: string }] }>(
      `${environment.api}/pages/${page}`
    );
  }

  addCoupon(coupon: Coupon) {
    const couponToAdd: Coupon = {
      code: coupon.code,
      discount: coupon.discount,
    };
    this.http
      .post(`${environment.api}/coupons`, couponToAdd)
      .subscribe();
  }
}
