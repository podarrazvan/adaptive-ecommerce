import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../interfaces/category.interface';
import { Footer } from '../../interfaces/footer.interface';
import { WebsiteDetails } from '../../interfaces/website-details';
import { SharedDataService } from '../shared-data.service';

@Injectable()
export class DbWebsiteEditService {
  constructor(private http: HttpClient,
              private sharedDataService: SharedDataService) {}
  categories: Category[];
  category;

  websiteDetails(details: WebsiteDetails) {
    console.log('websiteDetails',details);
    const websiteDetails = { info: details };
    const id = this.sharedDataService.websiteDocId;
    console.log(id);
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

  addToCarousel(key: string, category: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const product = { id: key, category: category };
    this.http
      .post(
        `https://shop-436e8.firebaseio.com/homepage/carousel/.json?auth=${user._token}`,
        product,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log('error:', error);
          error.next(error.message);
        }
      );
  }

  addHomepageArea(name: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const area = { name: name };
    this.http
      .post<{ name: string }>(
        `https://shop-436e8.firebaseio.com/homepage/areas/.json?auth=${user._token}`,
        area,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log('error:', error);
          error.next(error.message);
        }
      );
  }

  updateHomepageArea(name: string, id: string) {
    console.log(name, id);
    const user = JSON.parse(localStorage.getItem('userData'));
    const area = { name: name };
    return this.http.put<{ name: string }>(
      `https://shop-436e8.firebaseio.com/homepage/areas/${id}/.json?auth=${user._token}`,
      area,
      {
        observe: 'response',
      }
    );
  }

  addCategory(name: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const category = { name: name };
    this.http
      .post<{ name: string }>(
        `https://shop-436e8.firebaseio.com/categories/.json?auth=${user._token}`,
        category,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  updateCategory(name: string, id: string) {
    console.log(name, id);
    const user = JSON.parse(localStorage.getItem('userData'));
    const category = { name: name };
    return this.http.put<{ name: string }>(
      `https://shop-436e8.firebaseio.com/categories/${id}/.json?auth=${user._token}`,
      category,
      {
        observe: 'response',
      }
    );
  }

  editTermsOfUse(termsOfUse: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const terms = { termsOfUse: termsOfUse };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/terms-of-use/.json?auth=${user._token}`,
        terms,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  editAboutUs(aboutUs: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const about = { aboutUs: aboutUs };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/about-us/.json?auth=${user._token}`,
        about,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  setName(name: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const websiteName = { name: name };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/website-name/.json?auth=${user._token}`,
        websiteName,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  footer(footer: Footer) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const footerData = {
      adress: footer.adress,
      phone: footer.phone,
      email: footer.email,
      facebookLink: footer.facebookLink,
      instagramLink: footer.instagramLink,
      twitterLink: footer.twitterLink,
      facebookLogo: footer.facebookLogo,
      instagramLogo: footer.instagramLogo,
      twitterLogo: footer.twitterLogo,
    };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/footer/.json?auth=${user._token}`,
        footerData,
        {
          observe: 'response',
        }
      )
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
