import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { WebsiteDetails } from '../interfaces/website-details';

@Injectable()
export class SharedDataService implements OnDestroy {

  brand$ = new BehaviorSubject<{name:string, img: string}>({name:"",img:""});
  emptyCart$ = new BehaviorSubject<boolean>(true);
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  cast = this.emptyCart$.asObservable();
  // cast = this.isAuthenticated.asObservable();

  // TODO: SORIN - make it private
  websiteDetails = new BehaviorSubject<WebsiteDetails>(null);
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
    return this.websiteDetails.value;
  }

  setUserDetails(details: User) {
    this.userDetails.next(details);
  }

  updateUserDetails(details: User) {
    localStorage.setItem('userData',JSON.stringify(details));
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
