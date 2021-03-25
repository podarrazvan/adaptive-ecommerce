import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Layout } from './../interfaces/website-details';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { BestSellers } from '../interfaces/best-sellers.interface';
import { Statistics } from '../interfaces/statistics.interface';
import { CartItem } from '../interfaces/cartItem.interface';

interface Brand {
  name: string;
  img: string;
}

@Injectable()
export class SharedDataService implements OnDestroy {
  private brandSubject$ = new BehaviorSubject<Brand>(null);
  public brand$ = this.brandSubject$.asObservable();

  private layoutSubject$ = new BehaviorSubject<Layout>(null);
  public layout$: Observable<Layout> = this.layoutSubject$.asObservable();

  private statisticsSubject$ = new BehaviorSubject<Statistics>(null);
  public statistics$: Observable<Statistics> = this.statisticsSubject$.asObservable();

  private bestSellersSubject$ = new BehaviorSubject<BestSellers>(null);
  public bestSellers$: Observable<BestSellers> = this.bestSellersSubject$.asObservable();

  private userDetailsSubject$ = new BehaviorSubject<User>(null);
  public userDetails$: Observable<User> = this.userDetailsSubject$.asObservable();

  private cartSubject$ = new BehaviorSubject<CartItem[]>(null);
  public cart$: Observable<CartItem[]> = this.cartSubject$.asObservable();

  // !! fa-le si pe astea cum e mai sus
  productEdit: boolean;
  product: IProduct;
  unreadMessages: number;

  constructor(private http: HttpClient) {}

  getLayout() {
    return this.http.get<Layout>(`${environment.api}/website`);
  }

  setLayout(layout: Layout) {
    this.layoutSubject$.next(layout);
  }

  getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.cartSubject$.next(cart);
  }

  setCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject$.next(cart);
  }

  updateCartItemQuantity(index, quantity, product) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    product.quantity = quantity;
    product.total = +quantity * +product.price;
    cart[index] = product;

    this.setCart(cart);
  }

  setStatistics(statistics: Statistics) {
    this.statisticsSubject$.next(statistics);
  }

  setBestSellers(bestSellers) {
    this.bestSellersSubject$.next(bestSellers);
  }

  setUserDetails(details: User) {
    this.userDetailsSubject$.next(details);
    localStorage.setItem('userData', JSON.stringify(details));
  }

  updateUserDetails(details: User) {
    localStorage.setItem('userData', JSON.stringify(details));
    this.userDetailsSubject$.next(details);
  }

  ngOnDestroy() {
    this.productEdit = null;
    this.product = null;
    this.unreadMessages = null;
  }
}
