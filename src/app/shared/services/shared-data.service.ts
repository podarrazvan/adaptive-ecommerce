import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class SharedDataService implements OnDestroy {

  brand = new BehaviorSubject<{name:string, img: string}>({name:"",img:""});
  emptyCart = new BehaviorSubject<boolean>(true);
  isAuthenticated = new BehaviorSubject<boolean>(false);

  cast = this.emptyCart.asObservable();
  // cast = this.isAuthenticated.asObservable();

  productEdit: boolean;
  product: Product;
  unreadMessages: number;
  totalCart: number;
  mobile: boolean;
  
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
