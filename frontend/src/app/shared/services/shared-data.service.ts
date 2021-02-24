import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { WebsiteDetails } from '../interfaces/website-details';

@Injectable()
export class SharedDataService implements OnDestroy {
  brand$ = new BehaviorSubject<{ name: string; img: string }>({
    name: '',
    img: '',
  });
  emptyCart$ = new BehaviorSubject<boolean>(true);
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  cast = this.emptyCart$.asObservable();
  // cast = this.isAuthenticated.asObservable();

  websiteData = {
    name: 'name',
    categories: [],
    brands: [],
    shipping: [],
    footer: {
      adress: 'adress',
      phone: 'phone',
      email: 'email',
      program: 'program',
    },
    facebookImage: 'empty',
    facebookUrl: 'facebook url',
    twitterImage: 'empty',
    twitterUrl: 'twitter url',
    youtubeImage: 'empty',
    youtubeUrl: 'youtube url',
    instagramImage: 'empty',
    instagramUrl: 'instagram url',
    termsOfUse: '',
    aboutUs: '',
  };

  private websiteDetails = new BehaviorSubject<WebsiteDetails>(
    this.websiteData
  );
  websiteDocId: string;

  userDetails = new BehaviorSubject<User>(null);

  productEdit: boolean;
  product: Product;
  unreadMessages: number;
  totalCart: number;
  mobile: boolean;

  setWebsiteDetails(details: WebsiteDetails) {
    this.websiteDetails.next(details);
    this.websiteDocId = details._id;
  }

  getWebsiteConfigs() {
    console.log(this.websiteDetails.value);
    return this.websiteDetails.value;
  }

  setUserDetails(details: User) {
    this.userDetails.next(details);
  }

  updateUserDetails(details: User) {
    localStorage.setItem('userData', JSON.stringify(details));
    this.userDetails.next(details);
  }

  ngOnDestroy() {
    this.productEdit = null;
    this.product = null;
    this.unreadMessages = null;
    this.totalCart = null;
  }

  updateCart(newStatus) {
    this.emptyCart$.next(newStatus);
  }

  updateAuth(newStatus) {
    this.isAuthenticated$.next(newStatus);
  }

  updateBrand(newBrand) {
    this.brand$.next(newBrand);
  }
}
