import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/shared/interfaces/cartItem.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-home-flesh-deals-carousel',
  templateUrl: './home-flesh-deals-carousel.component.html',
  styleUrls: ['./home-flesh-deals-carousel.component.scss'],
})
export class HomeFleshDealsCarouselComponent implements OnInit {
  @Input() products;

  slides: Slide[][] = [];
  singleSlide: any;
  index = 0;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    const elements = 3;
    const lastIndex = 0;

    let times = 0;
    let slide: Slide[] = [];

    for (let i = lastIndex; i < this.products.length; i++) {
      times++;

      const product = this.products[i];

      const progressBar = Math.floor(
        ((product.initialQuantity - product.quantity) * 100) /
          product.initialQuantity
      );

      Object.assign(product, { progressBar: progressBar });

      slide.push(product);

      if (times === elements) {
        times = 0;
        this.slides.push(slide);
        slide = [];
      }
    }

    const slideLength = Object.keys(slide).length;
    if (slideLength != 0) {
      for (let i = slideLength - 1; i < elements - 1; i++) {
        slide.push(this.products[i]);
      }
      this.slides.push(slide);
    }
    this.singleSlide = this.slides[this.index];
  }

  next() {
    // ! must be this.singleSlide.length -1 not -2 !
    this.index == this.singleSlide.length - 2 ? (this.index = 0) : this.index++;
    this.singleSlide = this.slides[this.index];
  }

  previous() {
    // ! must be this.singleSlide.length -1 not -2 !
    this.index == 0 ? (this.index = this.singleSlide.length - 2) : this.index--;
    this.singleSlide = this.slides[this.index];
  }

  addToCart(product: IProduct) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) {
      cart = [];
    }
    const exists = this.productExists(product._id, cart);
    if (!exists) {
      const cartItem: CartItem = {
        id: product._id,
        quantity: 1,
        price: +product.price - product.discount.cut,
        name: product.title,
      };
      cart.push(cartItem);
      this.sharedDataService.setCart(cart);
      this.router.navigate(['/cart']);
    } else {
      alert('Already in cart!');
    }
  }

  productExists(id, cart) {
    for (let product of cart) {
      if (product.id == id) {
        return true;
      }
    }
    return false;
  }
}
export interface Slide {
  img: string;
  title: string;
}
