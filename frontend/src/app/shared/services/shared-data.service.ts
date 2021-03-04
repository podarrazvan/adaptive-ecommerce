import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { Configs } from '../interfaces/website-details';

@Injectable()
export class SharedDataService implements OnDestroy {
  brand$ = new BehaviorSubject<{ name: string; img: string }>({
    name: '',
    img: '',
  });
  emptyCart$ = new BehaviorSubject<boolean>(true);
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  cast = this.emptyCart$.asObservable();

  websiteData = {
    //! Delete this!
    _id: '6039cc381b8e9dba840b9302',
    //!
    name: 'name',
    categories: [{name:'Phones'}],
    coupons:[],
    brands: [
      {
        image: 'http://localhost:3000/images/1451925798-1611925797622.png',
        name: 'Apple',
      },
    ],
    shipping: [],
    footer: {
      adress: 'adress',
      phone: 'phone',
      email: 'email',
      program: 'program',
      facebookImage: 'empty',
      facebookUrl: 'facebook url',
      twitterImage: 'empty',
      twitterUrl: 'twitter url',
      youtubeImage: 'empty',
      youtubeUrl: 'youtube url',
      instagramImage: 'empty',
      instagramUrl: 'instagram url',
    },
    
    termsOfUse: '',
    aboutUs: '',
  };

  private configs = new BehaviorSubject<Configs>(
    this.websiteData
  );

  userDetails = new BehaviorSubject<User>(null);

  productEdit: boolean;
  product: Product;
  unreadMessages: number;
  totalCart: number;
  mobile: boolean;

  setconfigs(details: Configs) {
    this.configs.next(details);
  }

  getWebsiteConfigs() {
    return this.configs.value;
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
