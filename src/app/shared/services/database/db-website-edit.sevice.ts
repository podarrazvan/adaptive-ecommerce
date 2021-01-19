import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsiteDetails } from '../../interfaces/website-details';
import { SharedDataService } from '../shared-data.service';
import { Coupon } from '../../interfaces/coupon.interface';

@Injectable()
export class DbWebsiteEditService {
  constructor(private http: HttpClient,
              private sharedDataService: SharedDataService) {}
  categories: string[];
  category;

  websiteDetails(details: WebsiteDetails) {
    const websiteDetails = { info: details };
    const id = this.sharedDataService.websiteDocId;
    if (id) {
      console.log('put');
      this.http
        .put(`http://localhost:3000/api/website/${id}`, websiteDetails)
        .subscribe((error) => console.log(error));
    } else {
      console.log('post')
      this.http
      .post('http://localhost:3000/api/website', websiteDetails)
      .subscribe(()=>location.reload());
    }
  }

  fetchWebsiteDetails() {
    return this.http.get<{ info: WebsiteDetails }>(
      'http://localhost:3000/api/website'
    );
  }

  editPages(content: string,page: string, id?: string) {
    const pageData = { content: content};
    console.log(id);
    if (!id) {
      this.http
        .post(
          `http://localhost:3000/api/pages/${page}`,
          pageData)
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
      .put(
        `http://localhost:3000/api/pages/${page}/${id}`,
        pageData)
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
    return this.http.get<{ info: [{content:string, _id: string}] }>(
      `http://localhost:3000/api/pages/${page}`);
  }

  addCoupon(coupon: Coupon) {
    const couponToAdd: Coupon = {
      code: coupon.code,
      discount: coupon.discount
    }
    this.http.post('http://localhost:3000/api/coupons',couponToAdd).subscribe();
  }

}
