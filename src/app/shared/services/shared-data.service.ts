import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { WebsiteDetails } from '../interfaces/website-details';

@Injectable()
export class SharedDataService implements OnDestroy {

  brand = new BehaviorSubject<{name:string, img: string}>({name:"",img:""});
  emptyCart = new BehaviorSubject<boolean>(true);
  isAuthenticated = new BehaviorSubject<boolean>(false);

  cast = this.emptyCart.asObservable();
  // cast = this.isAuthenticated.asObservable();

  websiteDetails = new BehaviorSubject<WebsiteDetails>(null);
  websiteDocId: string;

  productEdit: boolean;
  product: Product;
  unreadMessages: number;
  totalCart: number;
  mobile: boolean;
  
  setWebsiteDetails(details: WebsiteDetails) {
    this.websiteDetails.next(details);
    this.websiteDocId = details._id;
  }

  ngOnDestroy() {
    this.productEdit = null;
    this.product = null;
    this.unreadMessages = null;
    this.totalCart = null;
  }

  updateCart(newStatus) {
    this.emptyCart.next(newStatus);
  }
  
  updateAuth(newStatus) {
    this.isAuthenticated.next(newStatus);
  }
  
  updateBrand(newBrand) {
    this.brand.next(newBrand);
  }
  
}
